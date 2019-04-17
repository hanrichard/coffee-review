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
            background-color: red;

            .mainmapcontainer {
                height: 400px;
                position: relative;

                @media only screen and (min-width: 600px) {
                    height: 100vh;
                }
            }
        `          
       
        return (
            <Wrapper>
                <div className="mainmapcontainer">
                    <Map google={this.props.google}
                        initialCenter={{
                            lat: -33.853159,
                            lng: 151.2098305
                        }}
                        style={mapstyle}
                        className='map'
                        zoom={15}>
                        {newShops}
                    </Map>
                </div>
            </Wrapper>
        );
    } 
    
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDNu-7AYiYiQQDb_1M7LS3ssEMNaD_9Wfg'
})(MainMapList)