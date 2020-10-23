import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearUser} from '../../Redux/Authreducer'
import logo from '../../assets/journal-logo.png'
import homeLogo from '../../assets/house.png'
import newEntryLogo from '../../assets/add-entry.png'
import logoutLogo from '../../assets/logout.png'
import './Nav.scss'

function Nav(props) {
    return (
        <div className='navbar'>
            <img className='nav-logo' src={logo} alt='Logo'/>
            <span className='nav-user'>Welcome back!{props.user.email}</span>
            <Link to='/dashboard'><img className='nav-home' src={homeLogo} alt='home' /></Link>
            <Link to='/new'><img className='nav-new-entry' src={newEntryLogo} alt='New Entry' /></Link>
            <Link to='/'><img className='logout-button' src={logoutLogo} alt='Logout' /></Link>
        </div>
    )
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {clearUser})(Nav);