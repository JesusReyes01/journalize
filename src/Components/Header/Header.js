import React, {useState} from 'react';
import {connect} from 'react-redux';
import './Header.scss';
import Menu from '../Menu/Menu';
import logo from '../../assets/journal-logo.png'
import {menuToggle} from '../../Redux/menuReducer'



function Header(props) {
    const [state, sState] = useState({
        menu: false
    })

    const slide = () => {
        sState({menu: !state.menu})
        props.menuToggle()
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
                    <div className='header-drop'>{props.authReducer.user.first_name?props.authReducer.user.first_name:'Please Login'}</div>
                </nav>
                <div>
                    <Menu className={state.menu?'menu sld':'menu'}/>
                </div>
            </div>
        </div>
    
    )

}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {menuToggle})(Header);
