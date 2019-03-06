import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
// const class GoogleMap extends React.Component{

const SimpleMap = ({lat, lon}) => {
  console.log('load new map')
  const center = [lat, lon]
  const zoom = 17
  console.log(center)

  return (
    <div className="simplemap" style={{ height: '300px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBWuCReTeS6FxoKxUeSNJZrzjHSseJCNic' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <span className="marker"
          lat={lat}
          lng={lon}
        />
      </GoogleMapReact>
    </div>
  );
}

 
export default SimpleMap;