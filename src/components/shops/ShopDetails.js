import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { Redirect, Link } from 'react-router-dom'
import moment from 'moment';


const ShopDetails = (props) => {
    const {shop, reviews, users} = props;

    const userRender = (userid) => {
        if(users) {
            const user = users.filter(
                user => user.id === userid
            )
            return user[0].name.toUpperCase()
        } else {
            return <span>no user found</span>
        }
    }

    const totalReviews = () => {
        if(reviews) {
            const relativeReviews = reviews.filter(review => review.shopid === props.match.params.id)
            const relativeReviewsTotal = relativeReviews.reduce(function (accumulator, review) {
                return accumulator + review.coffee;
            }, 0)
            const relativeReviewsNumber = relativeReviews.length

            return (
                <div>
                    <div><b>total review number</b>: {relativeReviewsNumber}</div>
                    <div><b>total review score</b>: {relativeReviewsTotal/relativeReviewsNumber}</div>
                </div>

            )
        }
        else {
            return <span>no total review</span>
        }
    }

    const reviewRender = () => {
        if(reviews) {
            return (   
            reviews.filter(
                review => review.shopid === props.match.params.id).map(
                    review => {
                        return (
                            <div key={review.id}>
                                <h4><b>{userRender(review.userid)}</b>'s reviews</h4>
                                <p>
                                    <b>review content:</b> {review.review} +  <br/>
                                    <b>shopid:</b> {review.shopid} <br/>
                                    <b>userid:</b> {review.userid} <br/>
                                    <b>coffee:</b> {review.coffee} <br/>
                                </p>
                            </div>
                        )
                    }
                )
            )
        }
        else {
          return <div className="container center">loading...</div>
        }
    }
 
//   if(!auth.uid) return <Redirect to="/signin" />
  
  if(shop) {
      return (
        <div className="container section">
        <div className="card">
            <Link to={'/shops'} >go back</Link>
        </div>
            <div className="card">
                <div className="card-content">
                    <div className="card-titile">
                        <h3>{shop.shopname}</h3>
                    </div>
                    <div className="card-content">  
                        <p><b>address:</b> {shop.address} {shop.suburb}</p>
                        <p>{shop.shoplat}</p>
                        <p>{shop.shoplon}</p>
                        <hr />
                        {totalReviews()}
                        <hr />

                        {reviewRender()}
                    </div>
                </div>
            </div>
        </div>
    )
  } else {
      return <div className="container center">loading...</div>
  }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    const id = ownProps.match.params.id;
    const shops = state.firestore.data.shops;
    const shop = shops?shops[id] : null;

    return {
        shop: shop, 
        reviews: state.firestore.ordered.reviews,
        users: state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'shops'},
        { collection: 'reviews'},
        { collection: 'users'},
    ])
)(ShopDetails)