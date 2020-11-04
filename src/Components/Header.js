import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearUser} from '../Redux/authReducer'
import {getDarkMode, updateDarkMode, resetDarkMode} from '../Redux/darkModeReducer'
import '../Style/Header.scss';
import '../Style/DarkMode.scss';
import Menu from './Menu';
import logo from '../assets/journal-logo.png'
import logoDarkMode from '../assets/journal-logo-darkmode.png'
import downArrow from '../assets/down-arrow.png'
import downArrowDarkMode from '../assets/down-arrow-darkmode.png'

function Header(props) {
    const [state, sState] = useState({
        menu: false,
        popup: false
    })

    useEffect(()=>{
        const body = document.getElementsByTagName('body')[0];
        const upArrow = document.querySelector('.arrow-up');
        const upArrowBorder = document.getElementsByClassName('arrow-up-border')[0];
        const insidePopUp0 = document.getElementsByClassName('inside-popup')[0];
        const insidePopUp1 = document.getElementsByClassName('inside-popup')[1];
        if(props.darkModeReducer.darkMode.data === true){
            body.classList.add('dark');
            upArrow.classList.add('dark');
            upArrowBorder.classList.add('dark');
            insidePopUp0.classList.add('dark');
            insidePopUp1.classList.add('dark');
        }
        else{
            body.classList.remove('dark');
            upArrow.classList.remove('dark');
            upArrowBorder.classList.remove('dark');
            insidePopUp0.classList.remove('dark');
            insidePopUp1.classList.remove('dark');
        }
    },[props.darkModeReducer.darkMode.data])

    const slide = () => {
        sState({...state, menu: !state.menu})
    }
    const popup = () => {
        sState({...state, popup: !state.popup})
    }
    const handleDarkMode = () => {
        props.updateDarkMode(!props.darkModeReducer.darkMode.data)
    }
    const logout = () => {
        props.clearUser()
        const body = document.getElementsByTagName('body')[0];
        const upArrow = document.querySelector('.arrow-up');
        const upArrowBorder = document.getElementsByClassName('arrow-up-border')[0];
        const insidePopUp0 = document.getElementsByClassName('inside-popup')[0];
        const insidePopUp1 = document.getElementsByClassName('inside-popup')[1];
        body.classList.remove('dark');
        upArrow.classList.remove('dark');
        upArrowBorder.classList.remove('dark');
        insidePopUp0.classList.remove('dark');
        insidePopUp1.classList.remove('dark');
    }

    return(
        <div>
            <div className={state.menu?'nav-header':'nav-header slide'}>
                <nav className='header-comp'>
                    <div className='header-icon' onClick={slide}>&#9776;</div>
                    <div className='header-logo'>
                        <img className='nav-logo' src={props.darkModeReducer.darkMode.data?logoDarkMode:logo} alt='Logo'/>
                        <p>Journalize</p>
                    </div>
                    <div className='header-drop' onClick={popup}> 
                        {props.authReducer.user.first_name}
                        <img className='popup-icon' src={props.darkModeReducer.darkMode.data?downArrowDarkMode:downArrow} alt='down-arrow'/>
                    </div>
                    <div class={state.popup?'arrow-up':'arrow-up pop'}></div>
                    <div class={state.popup?'arrow-up-border':'arrow-up-border pop'}></div>
                    <div className={state.popup?'popup':'popup pop'}>
                        <div className='inside-popup'>Account</div>
                        <div  onClick={handleDarkMode} className='inside-popup'>{props.darkModeReducer.darkMode.data?'Light Mode':'Dark Mode'}</div>
                        <Link className='inside-popup' to='/' onClick={logout}>Logout</Link>

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
export default connect(mapStateToProps, {clearUser, getDarkMode, updateDarkMode, resetDarkMode})(Header);


