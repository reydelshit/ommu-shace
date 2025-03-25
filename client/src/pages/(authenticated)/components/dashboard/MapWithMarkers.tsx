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

const eventIcon = (color = 'red') =>
  L.divIcon({
    className: 'custom-event-marker',
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
      </svg>
    `,
    iconSize: [30, 30], // Adjust size
    iconAnchor: [15, 30], // Center anchor
    popupAnchor: [0, -30], // Popup position
  });

const userIcon = (imagePath: string) =>
  L.divIcon({
    className: 'custom-user-marker',
    html: `
      <div style="
        width: 40px; 
        height: 40px; 
        border-radius: 50%; 
        overflow: hidden; 
        border: 2px solid white;
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
      ">
        <img src="${imagePath && imagePath.trim() !== '' ? `${import.meta.env.VITE_BACKEND_URL}${imagePath}` : DefaultProfile}" 
          style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" 
        />
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
const MapWithMarkers = () => {
  const { user } = useSession();
  const DEFAULT_CENTER = useUserLocation();
  const { data } = useGetAllEventsWithoutPagination();
  const events = data?.events || [];

  const centerPosition =
    DEFAULT_CENTER && DEFAULT_CENTER.length === 2 ? { lat: DEFAULT_CENTER[0], lon: DEFAULT_CENTER[1] } : { lat: 6.5, lon: 125.3 };

  return (
    <MapContainer center={DEFAULT_CENTER || [0, 0]} zoom={16} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User Location Marker */}
      {centerPosition && user?.profilePicture && (
        <Marker position={DEFAULT_CENTER || [0, 0]} icon={userIcon(user.profilePicture)}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {events.map((event) => {
        const [lat, lon] = event?.markedLocation.split(',').map(Number);
        return (
          <Marker key={event.id} position={[lat, lon]} icon={eventIcon('blue')}>
            <Popup>
              <strong>{event.eventName}</strong>
              <br />
              {event.markedLocation}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapWithMarkers;
