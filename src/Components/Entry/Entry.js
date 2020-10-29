import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import './Entry.scss';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function Entry(props) {
    const [state, sState] = useState({
        title: '',
        date: [],
        img: '',
        content: '',
        calToggle: false
    })
    useEffect(()=> {
        if(!props.authReducer.user.email){
            props.history.push('/')
        }
        else{
            getSingleEntry();
        }
    },[])
    
    //axios request
    const getSingleEntry = () => {
        const {entryId} = props.match.params;
        console.log(entryId)
        axios
            .get(`/api/entries/single/${entryId}`)
            .then(res => {
                sState({...state,
                        title: res.data.title,
                        date: [res.data.date],
                        img: res.data.img,
                        content: res.data.content })})
        .catch(err => console.log(err.request));
    }
    const handleDelete = () => {
        const {entryId} = props.match.params;
        axios
            .delete(`/api/entries/${entryId}`)
            .then(() => props.history.push('/dashboard'))
            .catch(err => console.log(err))
     }
     const handleUpdate = () => {
        const {title,date, img, content} = state;
        const {entryId} = props.match.params;
        let fmtDate = date[0]
        axios
            .put(`/api/updateEntry/${entryId}`, {title, fmtDate, img, content})
            .then(() => props.history.push('/dashboard'))
            .catch(err => console.log(err))
    }
    const handleInput = (event) => {
        sState({...state, [event.target.name]: event.target.value})
    } 
    const calInput = (date) => {
        sState({...state, date: date.toLocaleString().split(","), calToggle: false}) 
    }


    //Calender Display
    const calToggle = () => {
        console.log(state.calToggle)
        sState({...state, calToggle: !state.calToggle})
    }
    let displayDate  = state.date[0]  

    return (
        <div>
                <div className='up-new-entry'>
                    <div className='up-entry-save-button-cont'>
                        <button 
                            className='up-entry-save-button'
                            onClick={handleUpdate}>SAVE</button>
                        <button 
                            className='up-entry-save-button'
                            onClick={handleDelete}>DELETE</button>
                    </div>
                    <section className='up-title-header'>
                        <input
                            className ='up-title-input'
                            name='title'
                            placeholder='Entry Title'
                            value={state.title}
                            onChange={handleInput}/>
                        <div
                            className='up-date-toggle'
                            onClick={calToggle}
                                >{displayDate}</div>   
                        {state.calToggle?
                            <div className = 'up-calender'>
                                <Calendar
                                    onChange={calInput}
                                    value={state.date}/>
                            </div>
                            :null}
                        
                    </section>

                    <section >  
                        <textarea
                            className='up-entry-content'
                            name='content'
                            value={state.content}
                            placeholder='Your entry here'
                            onChange={handleInput}/>
                    </section>
                </div>
            </div>
    
    )
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Entry);



//      }

//      handleDelete = () => {
//         axios.delete(`/api/posts/${this.state.post.post_id}`)
//         .then(() => this.props.history.push('/dashboard'))
//         .catch(err => console.log(err))
//      }

//     render(){
    
//         const {title, img, content, username, profile_picture, author_id} = this.state.post;

//         return(
//             <div className='post-flex'>
//                 <div className='title-header'>
//                     <h1 className='title'>{title}</h1>
//                     <div className="author-flex">
//                         <p>by {username}</p>
//                         <img src={profile_picture} alt='User-pic' />
//                     </div>
//                 </div>
//                 <div className='post'>
//                     <img src={img} alt='post-img' />
//                     <p>{content}</p>
//                 </div>
//                 {this.props.user.user_id === author_id
//                 ?
//                 (<button onClick={this.handleDelete}>Delete Post</button>)
//                 :
//                 (<button>Not User: Cannot Delete</button>)}
//          </div>
//         )
//     }
// }
// const mapStateToProps = reduxState => reduxState;
// export default connect(mapStateToProps)(Post);