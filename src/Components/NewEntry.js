import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../Style/NewEntry.scss'

function NewEntry(props) {
    const [state, sState] = useState({
        title: '',
        date: new Date(),
        img: '',
        content: '',
        calToggle: false
    })

    useEffect(()=> {
        if(!props.authReducer.user.email){
            props.history.push('/')
        }
    })

    const handleInput = (event) => {
        sState({...state, [event.target.name]: event.target.value})
    } 
    const calInput = (date) => {
        sState({...state, date: date, calToggle: false}) 
    }

    const handleSubmit = () => {
        const {title,date, img, content} = state;
        axios
            .post('/api/entries/create', {title, date, img, content})
            .then(() => props.history.push('/dashboard'))
            .catch(err => console.log(err))
    }

    const calToggle = () => {
        sState({...state, calToggle: !state.calToggle})
    }
    let displayDate  = state.date.toLocaleString().split(",")

    

    let textareas = document.getElementsByTagName('textarea');
    let count = textareas.length;
    for(var i=0;i<count;i++){
        textareas[i].onkeydown = function(e){
            if(e.keyCode==9 || e.which==9){
                e.preventDefault();
                var s = this.selectionStart;
                this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
                this.selectionEnd = s+1; 
            }
        }
    }

    return (
              <div>
                <div className='new-entry'>
                    <div className='entry-save-button-cont'>
                        <button 
                            className='entry-save-button'
                            onClick={handleSubmit}>SAVE</button>
                    </div>
                    
                    <section className='title-header'>
                        <input
                            className ='title-input'
                            name='title'
                            placeholder='Entry Title'
                            value={state.title}
                            onChange={handleInput}
                        />
                            
                        <div
                            className='date-toggle'
                            onClick={calToggle}
                                >{displayDate[0]}</div>   
                        {state.calToggle?
                        <div className = 'calender'>
                            <Calendar
                                onChange={calInput}
                                value={state.date}/>
                        </div>
                        :null}
                        
                    </section>

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



        