import {Map, Polygon, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import styled from 'styled-components'


export class MainMapList extends Component {

    render() {
        const {shops, userLocation} = this.props;
        console.log(userLocation)
        let pos = []
        const mapstyle = {
            width: '100%', 
            height: '100%', 
            position: 'relative'
        }
        const newShops = shops && shops.map(shop => {
            pos = {lat: shop.shoplat, lng: shop.shoplon}
            return (
                <Marker position={pos} key={shop.id}/>
                )
            }
        )

        const Wrapper = styled.div`
            height: 400px;
            position: relative;

            @media only screen and (min-width: 600px) {
                height: calc(100vh - 64px);
            }
        `          
       
        return (
            <Wrapper>
                <Map google={this.props.google}
                    initialCenter={userLocation}
                    style={mapstyle}
                    className='map'
                    zoom={12}>
                    {newShops}
                </Map>
            </Wrapper>
        );
    } 
    
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDNu-7AYiYiQQDb_1M7LS3ssEMNaD_9Wfg'
})(MainMapList)