import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGetAllEventsWithoutPagination } from '@/hooks/useEvent';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useSession } from '@/hooks/useSession';
import { DefaultProfile } from '@/utils/defaultImages';
import { Link } from 'react-router-dom';

// Custom icons

const eventIcon = L.icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const userIcon = (imagePath: string) =>
  L.icon({
    iconUrl: `${imagePath && imagePath.trim() !== '' ? `${import.meta.env.VITE_BACKEND_URL}${imagePath}` : DefaultProfile}`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

const MapWithMarkers = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const { user } = useSession();
  const DEFAULT_CENTER = useUserLocation();
  const { data } = useGetAllEventsWithoutPagination();
  const events = data?.events || [];

  const centerPosition =
    DEFAULT_CENTER && DEFAULT_CENTER.length === 2 ? { lat: DEFAULT_CENTER[0], lon: DEFAULT_CENTER[1] } : { lat: 6.5, lon: 125.3 };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error('Error getting user location:', error);
      },
    );
  }, []);

  return (
    <MapContainer center={[centerPosition.lat, centerPosition.lon]} zoom={16} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User Location Marker */}
      {userLocation && user?.profilePicture && (
        <Marker position={userLocation} icon={userIcon(user.profilePicture)}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {/* Event Markers with Labels */}
      {events.map((event) => {
        const [lat, lon] = event?.markedLocation.split(',').map(Number);
        return (
          <Marker key={event.id} position={[lat, lon]} icon={eventIcon}>
            <Popup>
              <Link to={`/event/${event.id}`}>{event.eventName}</Link>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapWithMarkers;
