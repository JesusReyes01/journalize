import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom';

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
            getEntry();
        }
    },[])
    
    const getEntry = () => {
        axios.get('/api/entries')
        .then(res => sState({...state, entries: res.data}))
        .catch(err => console.log('get entry request failed'))
        // const {myPost, search} = this.state;
        // axios.get(`/api/posts/${myPost}?search=${search}`)
        // .then(res => this.setState({posts: res.data, search: ''}))
        // .catch(err => console.log(err))
    }

    let mappedPosts = state.entries.map( el => {
        return (

        <Link to={`/entry/${el.entry_id}`} key={el.entry_id} >
            <div>
                <div>
                    {/* <h3 >{el.title}</h3> */}
                    <div >
                        <p >by {el.email}</p>
                        {/* <img src={el.profile_picture} alt='author' /> */}
                    </div>
                </div>
            </div>    
        </Link>
        )}
    )
        return(
            <div>
                <div className='post-table'>
                    Dashboard
                    {mappedPosts}
                </div>
            </div>
        )
    
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Dashboard);