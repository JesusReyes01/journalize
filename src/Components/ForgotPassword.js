import React,{useState} from 'react';
import axios from 'axios';
import '../Style/ForgotPassword.scss'
import {Link} from 'react-router-dom';
import logo from '../assets/journal-logo.png'
import {Alert} from 'react-bootstrap'

function ForgotPassword(props) {
    const [state, sState] = useState({
        email: '',
    })
    const [failedAlert, setFailedAlert] = useState(false);
    const [successfulAlert, setSuccessfulAlert] = useState(false);

    const sendEmail = async(e) => {
        e.preventDefault();
        const {email} = state;
        console.log(email)
        await axios
            .post('/api/email', {email})
            .then(() => {
                setSuccessfulAlert(true)
                // alert(`Reset password email has been sent.`)
                sState({email: ''})
                // props.history.push('/')
            })
            .catch(err => {
                setFailedAlert(true)
                // alert('Email is not on file.')
                console.log(err)
            }) 
    }
    const backToAuth = () => {
        setSuccessfulAlert(false)
        props.history.push('/')
    }

    return(
        <div>
            <header className='fpw-header'>
                    <Link className='fpw-link' to='/'>&#10094; BACK</Link>
            </header>
            {failedAlert?<Alert className ='fpw-alert' variant="danger" onClose={() => setFailedAlert(false) } dismissible>
                <Alert.Heading>Email is not on file!</Alert.Heading>
                    <p>Please try again.</p>
            </Alert>:null}
            {successfulAlert?<Alert className ='fpw-alert' variant="secondary" onClose={backToAuth} dismissible>
                <Alert.Heading>Password reset email has been sent</Alert.Heading>
            </Alert>:null}
            <div className='fpw-box'>
                <img className='logo' src={logo} alt='Logo'/>
                <h1 >Forgot Password</h1> 
                <span>Enter your account's email and we'll send you an email to reset the password</span>
                <input
                    className='fpw-input'
                    value={state.email}
                    name='email'
                    placeholder='Email Address'
                    onChange={(e) =>  sState({email: e.target.value})}/>
                <button 
                    className={state.email
                        ?'fpw-button change':'fpw-button'}
                    onClick={sendEmail}
                        >SEND EMAIL</button>
            </div>
        </div>
    )


}
export default ForgotPassword;