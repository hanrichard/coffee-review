import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, populate} from 'react-redux-firebase';
import {compose} from 'redux'
import {Redirect, Link} from 'react-router-dom'
import moment from 'moment';
import CreateReview from '../reviews/CreateReview';
import SimpleMap from '../maps/SimpleMap';
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
        const {shops, reviews, users, auth, shopsOrder} = this.props;
        const shopid = this.props.match.params.id;
        const shopsubub = this.props.match.params.suburb;
        const Marker = () => <div className="marker"></div>

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
                let user = users[userid]
                console.log(user)
                if(user) {
                    return user['name']
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
                let center = [newshop.shoplat, newshop.shoplon]
                console.log(center)
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
                                    <hr/>

                                    <SimpleMap 
                                        lat={newshop.shoplat} 
                                        lon={newshop.shoplon} 
                                    />
    
                                    <div className="row">
                                        <div className="col s12 m8">

                                        <CreateReview 
                                            suburb={shopsubub}
                                            shopname={newshop.shopname} 
                                            shopid={shopid} 
                                            userid={auth.uid}/>
                                        <br />
                                        <hr/>
                                        <br />

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
                                            {reviewRender()}
                                        </div>
                                        
                                        <div className="col s12 m4">
                                            <h4>Coffees in nearby</h4>
                                            <ShopSimpleList shops={shopsOrder} />
                                        </div>
                                    </div>    
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
            <div className="shopdetail-layout">
                <div>{renderShopDetial()}</div>
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
            ],
            // orderBy: 'coffee',
            // limit: 8
        }, 
]), connect((state, ownProps) => ({
    shops: state.firestore.data.shops,
    shopsOrder: state.firestore.ordered.shops,
    users: state.firestore.data.users,
    auth: state.firebase.auth,
    reviews: state.firestore.ordered.reviews, 
  })
))(ShopDetails)
