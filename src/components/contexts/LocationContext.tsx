import React, { createContext, useState, useContext } from 'react';

interface LocationContextType {
  lat: number | null;
  lng: number | null;
  locationName: string;
  setLocation: (lat: number, lng: number, name: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [locationName, setLocationName] = useState<string>('');

  const setLocation = (newLat: number, newLng: number, name: string) => {
    setLat(newLat);
    setLng(newLng);
    setLocationName(name);
  };

  return (
    <LocationContext.Provider value={{ lat, lng, locationName, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};