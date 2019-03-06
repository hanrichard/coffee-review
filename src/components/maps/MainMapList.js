import {Map, Polygon, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';

export class MainMapList extends Component {
    
    render() {
        return (
            <Map google={this.props.google}
            initialCenter={{
                lat:  -33.8424092,
                lng: 151.2105247
            }}
            style={{width: '100%', height: '100vh', position: 'relative'}}
            className={'map'}
            zoom={15}>
           
           <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={{lat: -33.8543796, lng: 151.2044916}} />

            <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={{lat: -33.8383404, lng: 151.2044915}} />

            <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={{lat: -33.8365989, lng: 151.2016412}} />

            </Map>
        );
      }
    
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBWuCReTeS6FxoKxUeSNJZrzjHSseJCNic'
})(MainMapList)