import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

function Navbar({title,icon}){
    return(
        <div className="navbar bg-primary">
            <h1>
            <FontAwesomeIcon icon={icon} /> {title}
            </h1>
            <ul>
                <li> 
                    <Link to="/">Home</Link>
                </li>
                <li> 
                    <Link to="/about">About</Link>
                </li>
                <li> 
                    <Link to="/register">Register</Link>
                </li>
                <li> 
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </div>
    )
}

Navbar.propTypes={
    title: PropTypes.string.isRequired,
    icon:PropTypes.string
}
Navbar.defaultProps = {
    title: "Contact Keeper",
    icon:faIdCardAlt
}

export default Navbar;