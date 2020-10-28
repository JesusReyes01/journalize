import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import './NewEntry.scss'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function NewEntry(props) {
    const [state, sState] = useState({
        title: '',
        date: new Date(),
        img: '',
        content: '',
        calToggle: false
    })

    // useEffect(()=> {
    //     if(!props.authReducer.user.email){
    //         props.history.push('/')
    //     }
    // })

    const handleInput = (event) => {
        sState({...state, [event.target.name]: event.target.value})
    } 
    const calInput = (date) => {
        sState({...state, date, calToggle: false}) 
    }

    const handleSubmit = () => {
        const {title,date, img, content} = state;
        axios
            .post('/api/entries/create', {title, date, img, content})
            .then(() => props.history.push('/dashboard'))
            .catch(err => console.log(err))
    }
    //Calender Display
    const calToggle = () => {
        console.log(state.calToggle)
        sState({...state, calToggle: !state.calToggle})
    }
    let displayDate  = state.date.toLocaleString().split(",")[0]
    

    return (
              <div>
                <button 
                    className='entry-save-button'
                    onClick={handleSubmit}>SAVE</button>
                <div className='new-entry'>
                    <section className='title-header'>
                        <input
                            className ='title-input'
                            name='title'
                            placeholder='Entry Title'
                            value={state.title}
                            onChange={handleInput}/>
                        <div
                            className='date-toggle'
                            onClick={calToggle}
                                >{displayDate}</div>   
                        {state.calToggle?
                            <div className = 'calender'>
                                <Calendar
                                    onChange={calInput}
                                    value={state.date}/>
                            </div>
                            :null}
                        
                    </section>

                    {/* <div>
                        <img src={state.img} alt='Post-img'/>
                    </div> */}

                    {/* <section >
                        <p>Image URL:</p>
                        <input
                        name='img'
                        value={state.img}
                        onChange={handleInput}/>
                    </section> */}

                    <section >  
                        <textarea
                            className='entry-content'
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
export default connect(mapStateToProps)(NewEntry);



        