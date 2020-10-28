import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearUser} from '../../Redux/authReducer'
// import logo from '../../assets/journal-logo.png'
import homeLogo from '../../assets/house.png'
import newEntryLogo from '../../assets/add-entry.png'
import logoutLogo from '../../assets/logout.png'
import './Menu.scss'

function Menu(props) {
    return (
        <div {...props}>
            {/* <img className='menu-logo' src={logo} alt='Logo'/> */}
            <span className='menu-user'>Welcome back!<br/>{props.authReducer.user.first_name}</span>
            <Link to='/dashboard'><img className='menu-home' src={homeLogo} alt='home' /></Link>
            <Link to='/new'><img className='menu-new-entry' src={newEntryLogo} alt='New Entry' /></Link>
            <Link to='/' onClick={props.clearUser}><img className='logout-button' src={logoutLogo} alt='Logout' /></Link>
        </div>
    )
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {clearUser})(Menu);