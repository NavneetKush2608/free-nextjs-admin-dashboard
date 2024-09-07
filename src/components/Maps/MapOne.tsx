"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import axios from 'axios';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

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

const getAqiColor = (aqi: number): string => {
  if (aqi <= 50) return 'green';
  if (aqi <= 100) return 'yellow';
  if (aqi <= 150) return 'orange';
  if (aqi <= 200) return 'red';
  if (aqi <= 300) return 'purple';
  return 'maroon';
};

const MapOne: React.FC<MapOneProps> = ({ lat, lng }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [aqi, setAqi] = useState<number | null>(null);
  const markerLayerRef = useRef<VectorLayer<VectorSource> | null>(null);

  const initializeMap = useCallback(() => {
    if (!mapContainerRef.current) return;

    const initialMap = new Map({
      target: mapContainerRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([lng || 0, lat || 0]),
        zoom: 13,
      }),
    });

    mapRef.current = initialMap;
  }, [lat, lng]);

  const updateMarker = useCallback(() => {
    if (!mapRef.current || lat === null || lng === null || aqi === null) return;

    if (markerLayerRef.current) {
      mapRef.current.removeLayer(markerLayerRef.current);
    }

    const vectorSource = new VectorSource();
    const marker = new Feature({
      geometry: new Point(fromLonLat([lng, lat])),
    });

    marker.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({ color: getAqiColor(aqi) }),
          stroke: new Stroke({ color: 'white', width: 2 }),
        }),
      })
    );

    vectorSource.addFeature(marker);

    const markerLayer = new VectorLayer({
      source: vectorSource,
    });

    mapRef.current.addLayer(markerLayer);
    markerLayerRef.current = markerLayer;
  }, [lat, lng, aqi]);

  const fetchAqiData = useCallback(async () => {
    if (lat === null || lng === null) return;

    try {
      const response = await axios.get(
        `https://api.waqi.info/feed/geo:${lat};${lng}/?token=57b74b070c5f096f0f45fc49954843db05043616`
      );
      const aqiData = response.data.data.aqi;
      setAqi(aqiData);
    } catch (error) {
      console.error('Error fetching AQI data:', error);
    }
  }, [lat, lng]);

  useEffect(() => {
    initializeMap();
    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(undefined);
        mapRef.current = null;
      }
    };
  }, [initializeMap]);

  useEffect(() => {
    if (mapRef.current && lat !== null && lng !== null) {
      mapRef.current.getView().setCenter(fromLonLat([lng, lat]));
      mapRef.current.getView().setZoom(13);
      fetchAqiData();
    }
  }, [lat, lng, fetchAqiData]);

  useEffect(() => {
    updateMarker();
  }, [updateMarker]);

  if (lat === null || lng === null) {
    return <div>No location selected</div>;
  }

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">Air Quality Map</h4>
      </div>
      <div className="relative h-[400px] w-full">
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default MapOne;
