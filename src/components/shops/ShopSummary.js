import React from 'react';
import moment from 'moment';

const ShopSummary = ({shop, reviews}) => {

    const arrayToObject = (array) =>
        array.reduce((obj, item) => {
            obj[item.id] = item
            return obj
        }, {})
    
        const totalReviews = (shopid) => {
            if (reviews) {
                const relativeReviews = reviews.filter(review => review.shopid === shopid)
                const relativeReviewsTotal = relativeReviews.reduce(function (accumulator, review) {
                    return accumulator + parseInt(review.coffee);
                }, 0)
                const relativeReviewsNumber = relativeReviews.length

                return (
                    <div>
                        <div>
                            <span>coffee score: </span>
                            <b>{parseFloat(relativeReviewsTotal / relativeReviewsNumber).toFixed(1)} 
                            </b>
                        </div>
                        <div>
                            <b>{relativeReviewsNumber} reviews
                            </b>
                        </div>
                    </div>
                )
            } else {
                return <span>no total review</span>
            }
        }
    // console.log(review)
    return (
        <div className="card">
            <div className="card-content">
                <span className="card-title">{shop.shopname}</span>
                <p>{shop.shoplat}</p>
                <p>{shop.shoplon}</p>
                <p>Address: {shop.address}, {shop.suburb}</p>
                <p>{shop.id}</p>
                <div>{totalReviews(shop.id)} </div>
           </div>
        </div>
    )
}

export default ShopSummary