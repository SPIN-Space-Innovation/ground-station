import React from 'react';
import Globe from 'react-globe.gl';
import _ from 'lodash';
import Context from '../state/Context';

const pointOfView = { // Andoya
  lng: 16.03152757395328,
  lat: 66.29509714200718,
  altitude: 0.5,
};

export default function GlobeWrapper() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const { state } = React.useContext(Context);
  const globeEl = React.useRef();

  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    if (globeEl.current) (globeEl.current as any).pointOfView(pointOfView);
  }, []);

  const data = [{
    lat: (_.last(state.position) as PositionPoint).lat,
    lng: (_.last(state.position) as PositionPoint).long,
    size: (_.last(state.position) as PositionPoint).alt / 6371000,
    color: 'white',
  }];

  return (
    <div className="globe-wrapper">
      <Globe
        ref={globeEl}
        width={width - 32}
        height={800}
        pointsData={data}
        pointAltitude="size"
        pointsTransitionDuration={0}
        globeImageUrl={`${process.env.PUBLIC_URL}earth-night.jpg`}
      />
    </div>
  );
}
