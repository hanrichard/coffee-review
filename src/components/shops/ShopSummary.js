import React from 'react';
import moment from 'moment';

const ShopSummary = ({shop, reviews}) => {
    const renderReview = (shopid) => {
        if(reviews) {
            const newreview = reviews.filter(review => review.shopid === shopid)[0];
            return newreview.coffee
        } else {
            return <span>no user found</span>
        }
    };
    // console.log(review)
    return (
        <div className="card">
            <div className="card-content">
                <span className="card-title">{shop.shopname}</span>
                <p>{shop.shoplat}</p>
                <p>{shop.shoplon}</p>
                <p>Address: {shop.address}, {shop.suburb}</p>
                <p>coffee score: {renderReview(shop.id)} </p>
           </div>
        </div>
    )
}

export default ShopSummary