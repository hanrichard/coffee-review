import React from 'react';
// import Signedinlink from './Signedinlink';
// import Signoutlink from './Signoutlink';
import { connect } from 'react-redux';

const Homepage = (props) => {
    // const { auth, profile } = props;
    // console.log(auth)
    // const links = auth.uid ? <Signedinlink profile={profile}/> : <Signoutlink /> 
    return (
        <div className="container">
            <h1>welcome to <b>north sydney coffee review</b></h1>
        </div>
    )
}

export default Homepage