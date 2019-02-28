import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, populate} from 'react-redux-firebase';
import {compose} from 'redux'
import {Redirect, Link} from 'react-router-dom'
import moment from 'moment';
import CreateReview from '../reviews/CreateReview';
import StarRatingComponent from 'react-star-rating-component';
import ShopSimpleList from './ShopSimpleList';



class ShopDetails extends Component {
    state = {
        value: 'highest'
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    render() {
        const {shops, reviews, users, auth} = this.props;
        const shopid = this.props.match.params.id;
        const shopsubub = this.props.match.params.suburb;

        const arrayToObject = (array) => array.reduce((obj, item) => {
            obj[item.id] = item
            return obj
        }, {})

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

        const userRender = (userid) => {
            if(users) {
                const newUsers = arrayToObject(users)
                let user = newUsers[userid]
                
                if(user) {
                    return user.name
                }
                else {
                    return <span>not found</span>
                }
            }
        }

        const reviewRender = () => {
            if (reviews) {
                return (reviews.map(review => {
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

        const renderShopDetial = () => {
            let newshop = shops? shops[shopid]: null;
            if (newshop) {
                const suburbName = this.props.match.params.suburb;
                return (
                    <div className="container section">
                        <div className="">
                            <Link to={'/'}>Home 
                            </Link>
                            <Link to={'/'+suburbName}>
                                /{suburbName.replace('-', ' ')}
                            </Link>
                        </div>
    
                        <div className="">
                            <div className="card-content">
                                <div className="card-titile reviewTotal-card-titile">
                                    <h3>{newshop.shopname}</h3>
                                    {totalReviews()}
                                </div>
                                <div className="card-content">
                                    <p>
                                        <b>Address: </b>
                                        {newshop.address}, 
                                        {newshop.suburb}</p>
                                    <p>{newshop.shoplat}</p>
                                    <p>{newshop.shoplon}</p>
                                    <hr/>
                                    <CreateReview 
                                        suburb={shopsubub}
                                        shopname={newshop.shopname} 
                                        shopid={shopid} 
                                        userid={auth.uid}/>
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
        console.log(shops)
        return (
            <div>
                <div>{renderShopDetial()}</div>
                {/* <div><ShopSimpleList shops={shops} /></div> */}
            </div>
        )
    }
}

export default compose(firestoreConnect((props) => [ 
        { collection: 'users' },
        { collection: 'shops',
            where: [
                ['suburb', '==', props.match.params.suburb.replace("-", " ")]
            ] 
        }, 
        { collection: 'reviews',
            where: [
                ['shopid', '==', props.match.params.id]
            ]  
        }, 
]), connect((state, ownProps) => ({
    shops: state.firestore.data.shops,
    users: state.firestore.ordered.users,
    auth: state.firebase.auth,
    reviews: state.firestore.ordered.reviews, 
  })
))(ShopDetails)
