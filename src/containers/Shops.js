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

class Shops extends Component {
    render() {
        const {shops, reviews, auth, notifications } = this.props; 
        const userLocation = { lat: -33.8366159, lng: 151.2008305 };

        return (
            <ShopsList 
                shops={shops} 
                reviews={reviews} 
                userLocation={userLocation}
                suburb={this.props.match.params.suburb}
            />
        )
    }
}

export default compose(firestoreConnect((props) => [
    {collection: 'shops',
        where: [
            ['suburb', '==', props.match.params.suburb.replace("-", " ")]
        ],
    
    },
    {collection: 'reviews',
        where: [
            ['suburb', '==', props.match.params.suburb.replace("-", " ")]
        ]
    }
]), connect((state) => ({
    shops: state.firestore.ordered.shops,
    reviews: state.firestore.ordered.reviews,
  })
))(Shops)