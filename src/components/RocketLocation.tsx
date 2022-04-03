import { LatLngTuple, Map } from 'leaflet';
import React from 'react';
import _ from 'lodash';
import {
  MapContainer, Marker, Polyline, Popup, TileLayer,
} from 'react-leaflet';
import Context from '../state/Context';

// const position: LatLngTuple = [38.05, 23.31];

export default function RocketLocation() {
  const { state } = React.useContext(Context);
  const [position, setPosition] = React.useState<LatLngTuple>([0, 0]);
  const [path, setPath] = React.useState<any>([]);
  const [map, setMap] = React.useState<Map | null>(null);

  const whenMapCreated = (mapInstance: Map) => {
    setMap(mapInstance);
  };

  React.useEffect(() => {
    const lastPositionObj:
      { lat: number, long: number } = _.last(state.position) || { lat: 0, long: 0 };
    const lastPosition: LatLngTuple = [lastPositionObj.lat, lastPositionObj.long];

    setPosition(lastPosition);
    if (map) {
      map.panTo(lastPosition);
    }

    if (lastPosition[0] === 0 || lastPosition[1] === 0) {
      setPath([]);
    } else {
      setPath([...path, [...lastPosition]]);
    }
  }, [state.position]);

  return (
    <MapContainer center={position} zoom={20} whenCreated={whenMapCreated}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={path} pathOptions={{ color: 'red' }} />
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
