"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { QuadTree, Box, Point } from 'js-quadtree';
import debounce from 'lodash/debounce';

interface MapOneProps {
  lat: number | null;
  lng: number | null;
}

interface AQIData {
  lat: number;
  lon: number;
  aqi: number;
  uid: string;
  station: {
    name: string;
  };
}

const AQIMarker: React.FC<{ data: AQIData }> = React.memo(({ data }) => {
  const getMarkerColor = (aqi: number) => {
    if (aqi <= 50) return '#4ade80';
    if (aqi <= 100) return '#facc15';
    if (aqi <= 150) return '#fb923c';
    if (aqi <= 200) return '#f87171';
    if (aqi <= 300) return '#7c3aed';
    return '#881337';
  };

  const customIcon = useMemo(() => new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${getMarkerColor(data.aqi)}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; font-weight: bold;">${data.aqi}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  }), [data.aqi]);

  return (
    <Marker position={[data.lat, data.lon]} icon={customIcon}>
      <Popup>
        <strong>{data.station.name}</strong><br />
        AQI: {data.aqi}
      </Popup>
    </Marker>
  );
});
AQIMarker.displayName = 'AQIMarker';

interface MapEventHandlerProps {
  mapRef: React.MutableRefObject<L.Map | null>;
  debouncedFetchNearbyAQI: (bounds: L.LatLngBounds) => void;
}

const MapEventHandler: React.FC<MapEventHandlerProps> = ({ mapRef, debouncedFetchNearbyAQI }) => {
  const map = useMap();
  mapRef.current = map;

  useEffect(() => {
    if (map) {
      const handleMapChange = () => {
        const bounds = map.getBounds();
        debouncedFetchNearbyAQI(bounds);
      };

      map.on('moveend', handleMapChange);
      map.on('zoomend', handleMapChange);

      // Initial fetch
      handleMapChange();

      return () => {
        map.off('moveend', handleMapChange);
        map.off('zoomend', handleMapChange);
      };
    }
  }, [map, debouncedFetchNearbyAQI]);

  return null;
};
MapEventHandler.displayName = 'MapEventHandler';

const MapOne: React.FC<MapOneProps> = ({ lat, lng }) => {
  const [nearbyAQI, setNearbyAQI] = useState<AQIData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<L.Map | null>(null);
  const quadtreeRef = useRef<QuadTree<AQIData>>(new QuadTree(new Box(0, 0, 360, 180)));
  const cachedDataRef = useRef<Map<string, AQIData>>(new Map());

  // Define updateVisibleMarkers before it is used in fetchNearbyAQI
  const updateVisibleMarkers = useCallback((bounds: L.LatLngBounds) => {
    const visibleItems = quadtreeRef.current.query(new Box(
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast() - bounds.getWest(),
      bounds.getNorth() - bounds.getSouth()
    ));
    setNearbyAQI(visibleItems.map(item => item.data));
  }, []);

  const fetchNearbyAQI = useCallback(async (bounds: L.LatLngBounds) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.waqi.info/v2/map/bounds/?latlng=${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}&token=57b74b070c5f096f0f45fc49954843db05043616`);
      if (response.data.status === 'ok') {
        const newData = response.data.data;
        newData.forEach((item: AQIData) => {
          if (!cachedDataRef.current.has(item.uid)) {
            cachedDataRef.current.set(item.uid, item);
            quadtreeRef.current.insert(new Point(item.lon, item.lat, item));
          }
        });
        updateVisibleMarkers(bounds);
      } else {
        console.error('Error fetching AQI data:', response.data.data);
      }
    } catch (error) {
      console.error('Error fetching nearby AQI data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [updateVisibleMarkers]);

  const debouncedFetchNearbyAQI = useMemo(
    () => debounce((bounds: L.LatLngBounds) => fetchNearbyAQI(bounds), 300),
    [fetchNearbyAQI]
  );

  const memoizedMarkers = useMemo(() => 
    nearbyAQI.map(station => (
      <AQIMarker key={station.uid} data={station} />
    )),
    [nearbyAQI]
  );

  if (!lat || !lng) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Air Quality Map
        </h4>
      </div>
      <div className="relative h-[400px] w-full">
        <MapContainer 
          center={[lat, lng]} 
          zoom={10} 
          style={{ height: '100%', width: '100%', borderRadius: '0.375rem' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapEventHandler mapRef={mapRef} debouncedFetchNearbyAQI={debouncedFetchNearbyAQI} />
          {memoizedMarkers}
        </MapContainer>
      </div>
    </div>
  );
};
MapOne.displayName = 'MapOne';

export default MapOne;
