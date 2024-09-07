"use client";

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

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

const MapOne: React.FC<MapOneProps> = ({ lat, lng }) => {
  const [nearbyAQI, setNearbyAQI] = useState<AQIData[]>([]);

  useEffect(() => {
    const fetchNearbyAQI = async () => {
      if (lat === null || lng === null) return;

      try {
        const response = await axios.get(`https://api.waqi.info/v2/map/bounds/?latlng=${lat - 1},${lng - 1},${lat + 1},${lng + 1}&token=57b74b070c5f096f0f45fc49954843db05043616`);
        if (response.data.status === 'ok') {
          setNearbyAQI(response.data.data);
        } else {
          console.error('Error fetching AQI data:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching nearby AQI data:', error);
      }
    };

    fetchNearbyAQI();
  }, [lat, lng]);

  const getMarkerColor = (aqi: number) => {
    if (aqi <= 50) return '#4ade80';
    if (aqi <= 100) return '#facc15';
    if (aqi <= 150) return '#fb923c';
    if (aqi <= 200) return '#f87171';
    if (aqi <= 300) return '#7c3aed';
    return '#881337';
  };

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
          {nearbyAQI.map((station) => (
            <Marker 
              key={station.uid} 
              position={[station.lat, station.lon]}
              icon={new L.DivIcon({
                className: 'custom-div-icon',
                html: `<div style="background-color: ${getMarkerColor(station.aqi)}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; font-weight: bold;">${station.aqi}</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
              })}
            >
              <Popup>
                <strong>{station.station.name}</strong><br />
                AQI: {station.aqi}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
MapOne.displayName = 'MapOne';

export default MapOne;