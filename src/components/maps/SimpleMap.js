import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
const SimpleMap = ({lat, lon}) => {
  const center = [lat, lon]
  const zoom = 17

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '300px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDNu-7AYiYiQQDb_1M7LS3ssEMNaD_9Wfg' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <div className="marker"
          lat={lat}
          lng={lon}
        />
      </GoogleMapReact>
    </div>
  );
}

 
export default SimpleMap;