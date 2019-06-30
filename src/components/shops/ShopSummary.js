import React from 'react';
import moment from 'moment';
import SimpleMap from '../maps/SimpleMap';

const ShopSummary = ({shop, reviews, average, relativeReviewsNumber}) => {
    const totalReviews = (shopid) => {
        if (reviews) {
            return (
                <div>
                    <span>coffee score: </span>
                    <b>{average} </b> - 
                    <b>{relativeReviewsNumber} reviews</b>
                </div>
            )
        } else {
            return <span>no total review</span>
        }
    }

    return (
        <div className="card">
            <div className="card-content">
                <span style={{textTransform:'uppercase'}}>{shop.shopname}</span>
                <p>Address: <br />{shop.address}, {shop.suburb}</p>
                <div>{totalReviews()} </div>
           </div>
        </div>
    )
}

export default ShopSummary