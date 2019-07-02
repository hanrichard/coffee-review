import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, populate} from 'react-redux-firebase';
import {compose} from 'redux'
import {Redirect, Link} from 'react-router-dom'
import moment from 'moment';
import CreateReview from '../components/reviews/CreateReview';
import SimpleMap from '../components/maps/SimpleMap';
import StarRatingComponent from 'react-star-rating-component';
import ShopSimpleList from '../components/shops/ShopSimpleList';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


class ShopDetails extends Component {
    state = {
        value: ''
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    render() {
        const sortoptions = [
            'highest',
            'lowest',
            'newest',
            'oldest'
        ]

        const {shops, reviews, users, auth, shopsOrder} = this.props;
        const shopid = this.props.match.params.id;
        const shopsurbub = this.props.match.params.suburb;

        const userRender = (userid) => {
            return (
                users && users[userid] ? users[userid]['name'] : <span>User not found</span>
        )}   

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
                            <div className="StarRatingComponent-wrapper">
                                <b>{parseFloat(relativeReviewsTotal / relativeReviewsNumber).toFixed(1)} 
                                </b>
                            </div>
                        </div>

                        <a href="#reviews" className="shopReview-reviews">
                            Total {relativeReviewsNumber} reviews
                        </a>
                    </div>

                )
            } else {
                return <span>no total review</span>
            }
        } 

        const reviewRender = () => { 
            let newreviews = reviews;

            if (reviews && this.state.value === sortoptions[0]) {
                newreviews = reviews.sort((a,b) => a.coffee > b.coffee)
            } else if (reviews && this.state.value === sortoptions[1]) {
                newreviews = reviews.sort((a,b) => a.coffee < b.coffee)
            } else if (reviews && this.state.value === sortoptions[2]) {
                newreviews = reviews.sort((a,b) => a.createdat > b.createdat)
            } else if (reviews && this.state.value === sortoptions[3]) {
                newreviews = reviews.sort((a,b) => a.createdat < b.createdat)
            }

            return (
                reviews 
                ?
                newreviews.map(review => {
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
                                    {moment(review.createdat.toDate()).calendar()}
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                <div className="container center">loading...</div>
            )
        }

        const renderShopDetial = () => {
            let newshop = shops? shops[shopid]: null;
            if (newshop) {
                const suburbName = this.props.match.params.suburb;
                let center = [newshop.shoplat, newshop.shoplon]
                
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
                                    <h3><b>{newshop.shopname}</b></h3>
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
                                                suburb={shopsurbub}
                                                shopname={newshop.shopname} 
                                                shopid={shopid} 
                                                userid={auth.uid}/>
                                            <br />
                                            <hr/>
                                            <br />

                                            <form className="select-wrapper">
                                                <div style={{display: 'flex', alignItems: 'center'}}>
                                                <div variant="filled" className="formControl select"
                                                    style={{
                                                        width: '100%'
                                                    }}>
                                                        <Select
                                                            className="shopsort"
                                                            value={this.state.value}
                                                            onChange={this.handleChange}
                                                            name="age"
                                                            displayEmpty
                                                            classes={{root: 'selectclass'}}
                                                            className="selectEmpty"
                                                            >
                                                            <MenuItem value="" disabled>
                                                                Sort by
                                                            </MenuItem>

                                                            { sortoptions.map((option, index) => {
                                                                return (
                                                                    <MenuItem value={option} key={index}> {option}</MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </Select>  
                                                    </div> 
                                                
                                                </div>
                                            </form>
                                            <div id="reviews"> {reviewRender()}</div>
                                        </div>
                                        
                                        <div className="col s12 m4">
                                            <h4>Coffees in nearby <b>{suburbName}</b></h4>
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
        }, 
]), connect((state, ownProps) => ({
    shops: state.firestore.data.shops,
    shopsOrder: state.firestore.ordered.shops,
    users: state.firestore.data.users,
    auth: state.firebase.auth,
    reviews: state.firestore.ordered.reviews, 
  })
))(ShopDetails)
