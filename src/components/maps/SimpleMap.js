

// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
 
// // const AnyReactComponent = ({ text }) => <div>{text}</div>;
// // const class GoogleMap extends React.Component{

// const SimpleMap = ({lat, lon}) => {
//   console.log('load new map')
//   const center = [lat, lon]
//   const zoom = 17
//   console.log(center)

//   return (
//     <div className="simplemap" style={{ height: '300px', width: '100%' }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: 'AIzaSyDNu-7AYiYiQQDb_1M7LS3ssEMNaD_9Wfg' }}
//         defaultCenter={center}
//         defaultZoom={zoom}
//       >
//         <span className="marker"
//           lat={lat}
//           lng={lon}
//         />
//       </GoogleMapReact>
//     </div>
//   );
// }

 
// export default SimpleMap;


import {Map, Polygon, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import styled from 'styled-components'


export class SimpleMap extends Component {
    render() {
        const {lat, lon} = this.props
        let pos = []
        const mapstyle = {
            width: '100%', 
            height: '100%', 
            position: 'relative'
        }
        const initialCenter = {
          lat: lat,
          lng: lon
        }
        const newShops = <Marker position={initialCenter}/>

        const Wrapper = styled.div`
            height: 200px;
            position: relative;

            margin-bottom: 50px;
        `          
       
        return (
            <Wrapper>
                <Map google={this.props.google}
                    initialCenter={initialCenter}
                    style={mapstyle}
                    className='map'
                    zoom={17}>
                    {newShops}
                </Map>
            </Wrapper>
        );
    } 
    
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDNu-7AYiYiQQDb_1M7LS3ssEMNaD_9Wfg'
})(SimpleMap)