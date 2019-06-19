import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import ShopList from '../components/shops/ShopList';
import MainMapList from '../components/maps/MainMapList';
import {clickshop} from '../store/actions/shopsActions';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ShopsList from './ShopsList';

class Findme extends Component {
    state = { 
        userLocation: { lat: -33.8366159, lng: 151.2008305 }, 
        loading: true 
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                this.setState({
                        userLocation: { lat: latitude, lng: longitude },
                        loading: false
                    });
                },
                () => {this.setState({ loading: false });
            }
        );
    }

    render() {
        const {shops, reviews, auth, notifications } = this.props; 
        
        return (
            <ShopsList 
                shops={shops} 
                reviews={reviews} 
                userLocation={this.state.userLocation}
                suburb="north sydney"
            />
        )
    }
}

export default compose(firestoreConnect((props) => [
    {collection: 'shops',
        where: [
            ['suburb', '==', 'north sydney']
        ],
    
    },
    {collection: 'reviews',
        where: [
            ['suburb', '==', 'north sydney']
        ]
    }
]), connect((state) => ({
    shops: state.firestore.ordered.shops,
    reviews: state.firestore.ordered.reviews,
  })
))(Findme)