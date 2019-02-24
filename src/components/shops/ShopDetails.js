import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux'
import {Redirect, Link} from 'react-router-dom'
import moment from 'moment';
import CreateReview from '../reviews/CreateReview';
import StarRatingComponent from 'react-star-rating-component';


class ShopDetails extends Component {
    state = {
        value: 'highest'
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    render() {
        const {shop, reviews, users, auth} = this.props;
        const shopid = this.props.match.params.id;

        const userRender = (userid) => {
            if (users) {
                let user = users.filter(user => user.id === userid)[0]
                return user.name
            } else {
                return <span>no user found</span>
            }
        }

        const totalReviews = () => {
            if (reviews) {
                const relativeReviews = reviews.filter(review => review.shopid === shopid)
                const relativeReviewsTotal = relativeReviews.reduce(function (accumulator, review) {
                    return accumulator + parseInt(review.coffee);
                }, 0)
                const relativeReviewsNumber = relativeReviews.length

                return (
                    <div className="shopReview">
                        <div className="shopReview-total">
                            <h5 className="StarRatingComponent-wrapper">
                            <b>{parseFloat(relativeReviewsTotal / relativeReviewsNumber).toFixed(1)} 
                            </b></h5>
                        </div>
                        <div className="shopReview-reviews">
                            {relativeReviewsNumber} reviews
                        </div>
                    </div>

                )
            } else {
                return <span>no total review</span>
            }
        }

        const sortbycoffeeHighOrder = (a, b) => {
            if (a.coffee < b.coffee) 
                return 1;
            if (a.coffee > b.coffee) 
                return -1;
            return 0;
        }

        const sortbycoffeeLowOrder = (a, b) => {
            if (a.coffee > b.coffee) 
                return 1;
            if (a.coffee < b.coffee) 
                return -1;
            return 0;
        }

        const sortbytimeOldOrder = (a, b) => {
            if (a.createdat > b.createdat) 
                return 1;
            if (a.createdat < b.createdat) 
                return -1;
            return 0;
        }

        const sortbytimeNewOrder = (a, b) => {
            if (a.createdat < b.createdat) 
                return 1;
            if (a.createdat > b.createdat) 
                return -1;
            return 0;
        }

        const reviewRender = () => {
            if (reviews) {
                const relativeReviews = reviews.filter(review => review.shopid === shopid)

                let newrelativeReviews = relativeReviews.sort(sortbycoffeeHighOrder)

                if (this.state.value === 'highest') {
                    newrelativeReviews = relativeReviews.sort(sortbycoffeeHighOrder)
                }
                if (this.state.value === 'lowest') {
                    newrelativeReviews = relativeReviews.sort(sortbycoffeeLowOrder)
                }
                if (this.state.value === 'newest') {
                    newrelativeReviews = relativeReviews.sort(sortbytimeNewOrder)
                }
                if (this.state.value === 'oldest') {
                    newrelativeReviews = relativeReviews.sort(sortbytimeOldOrder)
                }

                return (newrelativeReviews.map(review => {
                    return (
                        <div key={review.id} className="reviewCard">
                            <h5>
                                <b>{userRender(review.userid)}</b>'s reviews
                            </h5>
                            <div className="reviewCard-content">
                            <div className="StarRatingComponent-wrapper">
                                <b>coffee: </b>
                                <StarRatingComponent 
                                    className="StarRatingComponent"
                                    name="test"
                                    value={parseFloat(review.coffee)}/>
                            </div>

                                <b>Review: </b>{review.review}
                                
                                <div className="review-small">
                                <b>Date: </b>
                                {moment(review.createdat.toDate()).calendar()}</div>
                            </div>
                        </div>
                    )
                }))
            } else {
                return <div className="container center">loading...</div>
            }
        }

        if (shop) {
            return (
                <div className="container section">
                    <div className="">
                        <Link to={'/shops'}>Go back</Link>
                    </div>
                    <div className="">
                        <div className="card-content">
                            <div className="card-titile reviewTotal-card-titile">
                                <h3>{shop.shopname}</h3>
                                {totalReviews()}
                            </div>
                            <div className="card-content">
                                <p>
                                    <b>Address: </b>
                                    {shop.address}, 
                                    {shop.suburb}</p>
                                <p>{shop.shoplat}</p>
                                <p>{shop.shoplon}</p>
                                <hr/>
                                <CreateReview shopname={shop.shopname} shopid={shopid} userid={auth.uid}/>
                                <hr/>

                                <form className="select-wrapper">
                                    <select
                                        className="select"
                                        value={this.state.value}
                                        onChange={this.handleChange}>
                                        <option defaultValue="highest">highest review</option>
                                        <option value="lowest">lowest review</option>
                                        <option value="newest">newest review</option>
                                        <option value="oldest">oldest review</option>
                                    </select>
                                </form>
                                <hr/> {reviewRender()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <div className="container center">loading...</div>
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    console.log(state)
    const id = ownProps.match.params.id;
    const shops = state.firestore.data.shops;
    const shop = shops
        ? shops[id]
        : null;
    return {shop: shop, reviews: state.firestore.ordered.reviews, users: state.firestore.ordered.users, auth: state.firebase.auth}
}

export default compose(connect(mapStateToProps), firestoreConnect([
    {
        collection: 'shops'
    }, {
        collection: 'reviews'
    }, {
        collection: 'users'
    }
]))(ShopDetails)
