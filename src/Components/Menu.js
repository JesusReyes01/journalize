import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import viewAll from '../assets/view-all.png'
import viewAllDarkMode from '../assets/view-all-darkmode.png'
import newEntryLogo from '../assets/add-entry.png'
import newEntryLogoDarkMode from '../assets/add-entry-darkmode.png'
import '../Style/Menu.scss'

function Menu(props) {
    const [state, sState] = useState({
        entries: [],
        darkMode: false
    })
    let location = useLocation();
    useEffect(()=> {
            axios.get('/api/entries')
            .then(res => sState({...state, entries: res.data}))
            .catch(err => console.log('get entry request failed'))
    },[location])


    let mappedEntries = state.entries
        .map( el => {
        return (
            
            <Link className ='menu-link' to={`/entry/${el.entry_id}`} key={el.entry_id} > 
                <div className='menu-entry'>
                    <span>{el.title}</span>
                    <span>{el.date[0]}</span>
                </div>
            </Link>)})


    return (
        <div {...props}>
            <div className='menu-user'>{props.authReducer.user.first_name}'s Journal</div>
            <Link className='menu-new-entry' to='/new'><img className='menu-new-entry-icon' src={props.darkModeReducer.darkMode.data?newEntryLogoDarkMode:newEntryLogo} alt='New Entry' /> New Entry</Link>
            <Link className='menu-view-all' to='/dashboard'><img className='menu-view-all-icon' src={props.darkModeReducer.darkMode.data?viewAllDarkMode:viewAll} alt='home' />View All Entries</Link>
            <div className='entry-flex'>
                {mappedEntries}
            </div>
        </div>
    )
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Menu);