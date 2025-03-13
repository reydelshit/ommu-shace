import { LatLngTuple } from 'leaflet';
import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'userLocation';

export const useUserLocation = () => {
  const [location, setLocation] = useState<LatLngTuple | null>(() => {
    const cachedLocation = localStorage.getItem(LOCAL_STORAGE_KEY);
    return cachedLocation ? (JSON.parse(cachedLocation) as LatLngTuple) : null;
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    if (!location) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: LatLngTuple = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setLocation(newLocation);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLocation));
        },
        (error) => {
          console.error('Error getting location:', error);
        },
      );
    }
  }, [location]);

  return location;
};
