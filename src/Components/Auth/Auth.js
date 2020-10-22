import React,{useState, useEffect} from 'react';
import axios from 'axios';
import '../Auth/Auth.scss'
import logo from '../../journal-logo.png'


function Auth(props) {
    const [state, sState] = useState({
        email: '',
        password: '',
        verPassword: '',
        profilePicture: '',
        registerView: false
      })


    const handleInput = (event) => {
        sState({...state, [event.target.name]: event.target.value})
    }  

    const handleToggle = () => {
        sState({...state, registerView: !state.registerView})
    }

    const handleLogin = () => {
        const {email, password} = state

        axios
        .post('/api/login', {email, password})
        .then(res => {
            // props.getUser(res.data)//redux function
            props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }

    const handleRegister = () => {
        const {email, password, verPassword} = state;
        if(password && password === verPassword){
            axios.post('/api/register', {email,  password})
            .then(res => {
                // props.getUser(res.data);//redux function
                props.history.push('/dashboard');
                
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
                {state.registerView
                ?<span onClick={handleToggle}>LOG IN</span>
                :<span onClick={handleToggle}>CREATE ACCOUNT</span>
                }
                {/* <span onClick={handleToggle}>CREATE ACCOUNT</span>
                <span onClick={handleToggle}>LOG IN</span> */}
            </header>
            
            <section className='auth-box'>
                <img className='logo' src={logo} alt='Logo'/>
                
                {state.registerView
                ? <h1 >Create Your Account</h1> 
                : <h1 >Log into Journal</h1>}


                <div>
                    <input
                        className='input'
                        value={state.email}
                        name='email'
                        placeholder='Email Address'
                        onChange={(e) =>  handleInput(e)}/>
                </div>
                
                <div> 
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
                            className={state.email && state.password && state.verPassword?'button-change':'button'}
                            onClick={handleRegister}
                                >CREATE ACCOUNT</button>
                       </>)
                    : (<div>
                        <button 
                            // {this.state.email && this.state.password 
                            // ? className='button'
                            // : className='button'}
                            className={state.email && state.password?'button-change':'button'}
                            onClick={handleLogin}
                                >LOG IN</button>
                        
                       </div>)}
            </section>
        </div>
    )
}

export default Auth