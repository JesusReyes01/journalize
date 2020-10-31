import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link,} from 'react-router-dom';
import './Dashboard.scss'

function Dashboard(props) {
    const [state, sState] = useState({
        search: '',
        entries: []
    })
    useEffect(() => {
        if(!props.authReducer.user.email){
            props.history.push('/')
        }
        else{
            getEntries();
        }
    },[]);

    const getEntries = () => {
        const {search} = state;
        axios.get(`/api/entries?search=${search}`)
        .then(res => sState({...state, entries: res.data}))
        .catch(err => console.log(err))
    }

    const handleSearch = (search) => {
        sState({...state, search: search})
    }
    const resetSearch = () => {
        sState({...state, search: ''})
        getEntries();
    }
    
    let mappedEntries = state.entries
        .map( el => {
        return (
            <Link className='entry-cmp' to={`/entry/${el.entry_id}`} key={el.entry_id}>
                        <div className='entry-flx'>
                            <span className='entry-ttl'>{el.title}</span>
                            <span className='entry-cntnt'>{el.content}</span>
                        </div>
                        <span className='entry-dt'>{el.date[0]}</span>
            </Link>)})

        return(
            <div className='dashboard'>
                <header className='dash-header'>
                    <div className='dash-header-cont'>
                        <div className='new-entry-cont'>
                            <div className='header-ttl'>
                                <span className='title-name'>{props.authReducer.user.first_name}'s Journal</span>
                                <span className='entry-count'>{state.entries.length} total entries</span>
                            </div>
                            <Link to='/new' className='new-entry-btn'>
                                &#8853; New Entry
                            </Link>
                        </div>
                        <div className='search-flex'>
                            <input
                                value={state.search}
                                onChange={(e) =>  handleSearch(e.target.value)}
                                placeholder='Search by Title'
                                />
                            <button onClick={getEntries} className='search-button'>Search</button>
                            <button onClick={resetSearch} className='reset-button'>Reset</button>
                        </div>
                    </div>


                </header>
                <div className='dashboard-table'>
                    <div className='table-header'>
                        <span className='header-entry'>Entry</span>
                        <span className='header-date'>Date Created</span>  
                    </div>
                    {mappedEntries}
                </div>
            </div>
        )
    
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Dashboard);