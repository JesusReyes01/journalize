import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearUser} from '../../Redux/authReducer'
import './Header.scss';
import Menu from '../Menu/Menu';
import logo from '../../assets/journal-logo.png'
import downArrow from '../../assets/down-arrow.png'

function Header(props) {
    const [state, sState] = useState({
        menu: false,
        popup: false
    })

    const slide = () => {
        sState({...state, menu: !state.menu})
        // props.menuToggle()
    }
    const popup = () => {
        sState({...state, popup: !state.popup})
    }

    return(
        <div>
            <div className={state.menu?'nav-header':'nav-header slide'}>
                <nav className='header-comp'>
                    <div className='header-icon' onClick={slide}>&#9776;</div>
                    <div className='header-logo'>
                        <img className='nav-logo' src={logo} alt='Logo'/>
                        <p>Journalize</p>
                    </div>
                    <div className='header-drop' onClick={popup}> 
                        {props.authReducer.user.first_name}
                        <img className='popup-icon' src={downArrow} alt='down-arrow'/>
                    </div>
                    <div class={state.popup?'arrow-up':'arrow-up pop'}></div>
                    <div class={state.popup?'arrow-up-border':'arrow-up-border pop'}></div>
                    <div className={state.popup?'popup':'popup pop'}>
                        <div className='inside-popup'>Account</div>
                        <div className='inside-popup'>Dark Mode</div>
                        <Link className='inside-popup' to='/' onClick={props.clearUser}>Logout</Link>

                    </div>
                </nav>
                <div>
                    <Menu className={state.menu?'menu sld':'menu'}/>
                </div>
            </div>
        </div>
    
    )

}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {clearUser})(Header);


