import React from 'react';
// import Signedinlink from './Signedinlink';
// import Signoutlink from './Signoutlink';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Demo from '../maps/Demo';

const Homepage = (props) => {
    // const { auth, profile } = props;
    // const links = auth.uid ? <Signedinlink profile={profile}/> : <Signoutlink /> 
    const Wrapper = styled.div`
        img {
            width: 100%
        }
        .footer {
            margin-top: 100px;
        }
    `          

    return (
        <Wrapper>
            <div className="container">
                <h1>Welcome to <b>North Sydney coffee review</b></h1>
                <div><img src="https://via.placeholder.com/1150x350" /></div>
                <div><Link to="/north-sydney"><h2>North sydney coffee</h2></Link></div>
                <div><Link to="/findme"><h4>Find coffee near me</h4></Link></div>
                <div className="footer">whatever: this needs to be footer, blablabla</div>
            </div>
        </Wrapper>
    )
}

export default Homepage
