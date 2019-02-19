import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment';


const ShopDetails = (props) => {
  const {shop} = props;
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
    console.log(ownProps)
    const id = ownProps.match.params.id;
    const shops = state.firestore.data.shops;
    const shop = shops?shops[id] : null
    return {
        shop: shop, 
        // auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'shops'}
    ])
)(ShopDetails)