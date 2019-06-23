import React from 'react';
import moment from 'moment';
import SimpleMap from '../maps/SimpleMap';

const ShopSummary = ({shop, reviews}) => {
    // const arrayToObject = (array) =>
    //     array.reduce((obj, item) => {
    //         obj[item.id] = item
    //         return obj
    //     }, {})
    
    const totalReviews = (shopid) => {
        if (reviews) {
            const relativeReviews = reviews.filter(review => review.shopid === shopid)
            const relativeReviewsTotal = relativeReviews.reduce(function (accumulator, review) {
                return accumulator + parseInt(review.coffee);
            }, 0)
            const relativeReviewsNumber = relativeReviews.length

            return (
                <div>
                    <span>coffee score: </span>
                    <b>{parseFloat(relativeReviewsTotal / relativeReviewsNumber).toFixed(1)} </b> - 
                    <b>{relativeReviewsNumber}  reviews  </b>
                </div>
            )
        } else {
            return <span>no total review</span>
        }
    }

    return (
        <div className="card">
            <div className="card-content">
                <span>{shop.shopname}</span>
                <p>Address: <br />{shop.address}, {shop.suburb}</p>
                <div>{totalReviews(shop.id)} </div>
           </div>
        </div>
    )
}

export default ShopSummary