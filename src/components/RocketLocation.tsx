import { LatLngTuple } from 'leaflet';
import React from 'react';
import {
  MapContainer, Marker, Popup, TileLayer,
} from 'react-leaflet';

const position: LatLngTuple = [38.05, 23.31];

export default function RocketLocation() {
  return (
    <MapContainer center={position} zoom={15}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup.
          <br />
          Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
