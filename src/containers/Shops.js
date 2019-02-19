import React, {Component } from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import ShopList from '../components/shops/ShopList';
import { clickshop } from '../store/actions/shopsActions'

class Shops extends Component {
    render() {
        // console.log(this.props)
        const { shops, auth, notifications } = this.props;
        // if(!auth.uid) return <Redirect to='/signin' />
        // console.log(this.props.shops)
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ShopList shops={shops} />
                    </div>
                    <div className="col s12 m6">
                    
                        {/* <Notification notifications={notifications}/> */}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        shops: state.firestore.ordered.shops,
        // auth: state.firebase.auth, 
        // notifications: state.firestore.ordered.notifications
    }
}

// const mapDispatchToProps = dispatch => {
//     // return {
//     //     clickshop: (shopid) => dispatch(clickshop(shopid))
//     // }
// }


  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'shops' },
        // { collection: 'shops', orderBy: ['createdAt', 'desc']},
    //   { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
    ])
  )(Shops)