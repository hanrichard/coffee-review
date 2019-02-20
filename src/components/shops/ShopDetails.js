import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment';


const ShopDetails = (props) => {
    const {shop, reviews, users} = props;

    console.log(users)
    const userRender = (userid) => {
        if(users) {
            const user = users.filter(
                user => user.id === userid
            )
            return user[0].name
        } else {
            return <span>no user found</span>
        }
    }
    
    const reviewRender = () =>{
        if(reviews) {
          return (
            reviews.filter(
                review => review.shopid === props.match.params.id).map(
                    review => {
                        return (
                            <div key={review.id}>
                                <h3>this shop's reviews</h3>
                                <p>
                                    <b>review content:</b> {review.review} +  <br/>
                                    <b>shopid:</b> {review.shopid} + <br/>
                                    <b>userid:</b> {review.userid} + <br/>
                                    <b>user name:</b>   
                                        {userRender(review.userid)}
                                    <br /><br />
                                </p>
                        </div>
                        )
                    })
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
                <div className="card-content">
                    <div className="card-titile">{shop.shopname}</div>
                    <div className="card-content">
                        <p>shop address</p>
                        <p>{shop.shoplat}</p>
                        <p>{shop.shoplon}</p>
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
    const reviews = state.firestore.ordered.reviews
    const users = state.firestore.ordered.users

    return {
        shop: shop, 
        reviews: reviews,
        users: users
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