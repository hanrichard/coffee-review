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
                    {/* <p>{project.content }</p> */}
                </div>
                <div className="card-action">
                    {/* <div className="">posted by {project.authorFirstname}  {project.authorLastname}</div>
                    <div className="">posted date {moment(project.createdAt.toDate()).calendar()}</div> */}
                </div>
            </div>
        </div>
    )
  } else {
      return <div className="container center">loading...</div>
  }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state)
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