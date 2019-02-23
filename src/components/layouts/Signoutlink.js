import React from 'react';
import { NavLink } from 'react-router-dom';

const Signoutlink = () => {
    return (
        <ul className="right">
            <li><NavLink to="/signup">sign up</NavLink></li>
            <li><NavLink to="/signin">Log in</NavLink></li>
        </ul>
    )
}

export default Signoutlink