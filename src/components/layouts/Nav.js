import React from 'react';
import { Link } from 'react-router-dom';
import Signedinlink from './Signedinlink';
import Signoutlink from './Signoutlink';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.nav`
    position: sticky;
    top: 0;
    z-index: 2;
`

const Nav = (props) => {
    const { auth, profile } = props;
    console.log(auth)
    const links = auth.uid ? <Signedinlink profile={profile}/> : <Signoutlink /> 

    return (
        <Wrapper className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className=" floating left">COFFEE REVIEW</Link>
                { links }
            </div>
        </Wrapper>
    )
}


const mapStateToProps = state => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Nav)
