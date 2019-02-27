import React from 'react';
// import Signedinlink from './Signedinlink';
// import Signoutlink from './Signoutlink';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

const Homepage = (props) => {
    // const { auth, profile } = props;
    // console.log(auth)
    // const links = auth.uid ? <Signedinlink profile={profile}/> : <Signoutlink /> 
    return (
        <div className="container">
            <h1>new welcome to <b>north sydney coffee review</b></h1>
            <div><Link to="/north-sydney">north sydney coffee</Link></div>
            <div><Link to="/sydney-cbd">sydney cbd coffee</Link></div>
        </div>
    )
}

export default Homepage