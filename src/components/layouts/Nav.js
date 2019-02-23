import React from 'react';
import { Link } from 'react-router-dom';
import Signedinlink from './Signedinlink';
import Signoutlink from './Signoutlink';
import { connect } from 'react-redux';

const Nav = (props) => {
    const { auth, profile } = props;
    console.log(auth)
    const links = auth.uid ? <Signedinlink profile={profile}/> : <Signoutlink /> 

    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className=" floating left">COFFEE REVIEW</Link>

                <ul className="right">
                    <li>
                        <Link to='/shops' className=" floating right">shops</Link>
                    </li>
                    <li>
                        <Link to='/reviews' className=" floating right">reviews</Link>
                    </li>
                </ul>

                { links }
                
            </div>
        </nav>
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
