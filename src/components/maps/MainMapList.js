import {Map, Polygon, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import styled from 'styled-components'


export class MainMapList extends Component {
    render() {
        const {shops} = this.props
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
                    initialCenter={{
                        lat: -33.8543796,
                        lng: 151.2444845
                        // to do:
                    }}
                    style={mapstyle}
                    className='map'
                    zoom={15}>
                    {newShops}
                </Map>
            </Wrapper>
        );
    } 
    
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDNu-7AYiYiQQDb_1M7LS3ssEMNaD_9Wfg'
})(MainMapList)