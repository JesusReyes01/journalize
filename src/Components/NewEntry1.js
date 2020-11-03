import React, {useState, useEffect} from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'
import {connect} from 'react-redux'
import '../Style/NewEntry.scss'

function NewEntry(props) {
    const [state, sState] = useState({
        title: '',
        date: '',
        img: '',
        content: ''
    })

    useEffect(()=> {
        if(!props.authReducer.user.email){
            props.history.push('/')
        }
    })

    const handleInput = (event) => {
        sState({...state, [event.target.name]: event.target.value})
    } 

    const handleSubmit = () => {
        const {title,date, img, content} = state;
        axios
            .post('/api/entries/create', {title, date, img, content})
            .then(() => props.history.push('/dashboard'))
            .catch(err => console.log(err))
}


    return (
              <div>
                {/* <h1>New Entry</h1> */}
                <div className='new-entry'>
                    <section >
                        <input
                            className ='title-input'
                            name='title'
                            placeholder='Entry Title'
                            value={state.title}
                            onChange={handleInput}/>
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
                    <CKEditor
                        editor={ ClassicEditor }
                        data="<p></p>"
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            sState({...state, content: data})
                            // console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                    </section>
                    <button onClick={handleSubmit}>SAVE</button>
                </div>
            </div>
    
    )
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(NewEntry);



        