import {Map, Polygon, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';

export class MainMapList extends Component {
    render() {
        const {shops} = this.props
        let pos = []
        const newShops = shops && shops.map(shop => {
            pos = {lat: shop.shoplat, lng: shop.shoplon}
            console.log(pos)
            return (
                <Marker position={ pos } key={shop.id}/>
                )
            }
        )
                   
       
        return (
            <div>
            <Map google={this.props.google}
            initialCenter={{
                lat: -33.853159,
                lng: 151.2098305
            }}
            style={{width: '100%', height: '100vh', position: 'relative'}}
            className={'map'}
            zoom={15}>
            {newShops}
            </Map>
            </div>
        );
    } 
    
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDNu-7AYiYiQQDb_1M7LS3ssEMNaD_9Wfg'
})(MainMapList)