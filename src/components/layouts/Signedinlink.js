import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../store/actions/authActions'

const Signedinlink = (props) => {
    return (
        <ul className="right">
            <li><a onClick={ props.signout}>Logout</a></li>
            {/* <li><NavLink to="/" className='btn btn-flaoting pink'>
                {props.profile.initials}</NavLink>
            </li> */}
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signout: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(Signedinlink)