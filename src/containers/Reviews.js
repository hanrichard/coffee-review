import React, {Component } from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'



class Reviews extends Component {
    render() {
        // console.log(this.props)
        // const { shops, auth, notifications } = this.props;
        // if(!auth.uid) return <Redirect to='/signin' />
        console.log(this.props.reviews)
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                    test
                        {/* <ProjectList projects={projects}/> */}
                    </div>
                    <div className="col s12 m6">
                    RIGHT
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
        reviews: state.firestore.ordered.reviews,
        // auth: state.firebase.auth, 
        // notifications: state.firestore.ordered.notifications
    }
}


  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'reviews' },
        // { collection: 'shops', orderBy: ['createdAt', 'desc']},
    //   { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
    ])
  )(Reviews)