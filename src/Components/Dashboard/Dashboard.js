import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom';
import './Dashboard.scss'

function Dashboard(props) {
    const [state, sState] = useState({
        search: '',
        myPost: true,
        entries: []
    })
    useEffect(()=> {
        if(!props.authReducer.user.email){
            props.history.push('/')
        }
        else{
            getEntries();
        }
    },[])
    
    const getEntries = () => {
        axios.get('/api/entries')
        .then(res => sState({...state, entries: res.data}))
        .catch(err => console.log('get entry request failed'))
        // const {myPost, search} = this.state;
        // axios.get(`/api/posts/${myPost}?search=${search}`)
        // .then(res => this.setState({posts: res.data, search: ''}))
        // .catch(err => console.log(err))
    }
    let mappedEntries = state.entries.map( el => {
        return (
            <Link to={`/entry/${el.entry_id}`} key={el.entry_id} >
                <div>
                    <div>
                        {/* <h3 >{el.title}</h3> */}
                        <div >
                            <p >title: {el.title}</p>
                            {/* <img src={el.profile_picture} alt='author' /> */}
                        </div>
                    </div>
                </div>    
            </Link>)})

        return(
            <div className='dashboard'>
                <div className='post-table'>
                    Dashboard
                    {mappedEntries}
                </div>
            </div>
        )
    
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Dashboard);