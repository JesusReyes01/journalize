import logo from '../../assets/journal-logo.png'
import React,{useState} from 'react';
import axios from 'axios';
import '../Auth/Auth.scss'
import {connect} from 'react-redux'
import {getUser} from '../../Redux/authReducer'


function Auth(props) {
    const [state, sState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        verPassword: '',
        profilePicture: '',
        registerView: false,
        forgotLoginView: false
    })


    const handleInput = (event) => {
        // console.log(event.target)//
        sState({...state, [event.target.name]: event.target.value})
    }  
    // const handleToggle = (event) => {
    //     console.log(event.target)
    //     sState({...state, [event.target.name]: !state.event.target.name})
    // }  
    const handleToggle = () => {
        sState({...state, registerView: !state.registerView})
    }

    const handleLogin = () => {
        const {email, password} = state

        axios
        .post('/api/login', {email, password})
        .then(res => {
            props.getUser(res.data)
            props.history.push('/new')
        })
        .catch(err => console.log(err))
    }

    const handleRegister = () => {
        const {firstName, lastName, email, password, verPassword} = state;
        if(password && password === verPassword){
            axios.post('/api/register', {firstName, lastName, email,  password})
            .then(res => {
                props.getUser(res.data);
                props.history.push('/new');
                
            })
            .catch(err => console.log(err));
        }
        else{
            alert(`Passwords don't match`)
        }
    }
    return (    
        <div className ='auth-body'>
            <header className='header'>
                {/* {state.registerView
                ?<span 
                    name='registerView'
                    onClick={(e) =>  handleToggle(e)}>LOG IN</span>
                :<div 
                    name='password'
                    onClick={(e) => handleToggle(e)}>CREATE ACCOUNT</div>
                } */}
                 {state.registerView
                ?<span 
                    name='registerView'
                    onClick={handleToggle}>LOG IN</span>
                :<span 
                    name='registerView'
                    onClick={handleToggle}>CREATE ACCOUNT</span>
                }
            </header>
            
            <section className='auth-box'>
                <img className='logo' src={logo} alt='Logo'/>
                
                {state.registerView
                ? <h1 >Create Your Account</h1> 
                : <h1 >Log into Journalize</h1>}


                <div>
                    {state.registerView
                    ?
                    <>
                        <input
                            className='input'
                            value={state.firstName}
                            name='firstName'
                            placeholder='First Name'
                            onChange={(e) =>  handleInput(e)}
                        />
                        <input
                            className='input'
                            value={state.lastName}
                            name='lastName'
                            placeholder='Last Name'
                            onChange={(e) =>  handleInput(e)}
                    />
                    </>     
                    :null
                    }

                    <input
                        className='input'
                        value={state.email}
                        name='email'
                        placeholder='Email Address'
                        onChange={(e) =>  handleInput(e)}/>
                    
                    <input 
                        className='input'
                        type='password'
                        value={state.password}
                        name='password'
                        placeholder='Password'
                        onChange={(e) => handleInput(e)}/>
                </div>

                {state.registerView
                    ? (<>
                        <input 
                            className='input'
                            type='password'
                            value={state.verPassword}
                            name='verPassword'
                            placeholder='Verify Password'
                            onChange={(e) => handleInput(e)}/>
                        <button 
                            className={state.firstName && state.lastName && state.email && state.password && state.verPassword?'button-change':'button'}
                            onClick={handleRegister}
                                >CREATE ACCOUNT</button>
                       </>)
                    : (<div>
                        <button 
                            className={state.email && state.password?'button-change':'button'}
                            onClick={handleLogin}
                                >LOG IN</button>
                        
                       </div>)
                }
                <div className='link'>
                    <span 
                    name='forgotLoginView'
                    onClick={handleToggle}>CAN'T LOG IN?</span>
                </div>

            </section>
        </div>
    )
}


export default connect(null, {getUser})(Auth);