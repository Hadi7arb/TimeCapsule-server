import { useState } from "react";
import React from "react";
import './SignIn.css';
import axios from 'axios';
const SignIn = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { email, password } = data;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setSubmitted(false);
        setError(false);
        setErrorMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError(true);
            setErrorMessage('Please enter both email and password.');
            setSubmitted(false);
            return;
        }

        setSubmitted(true);
        setError(false);
        setErrorMessage('');

        console.log('Sign-in data submitted:', data);

        console.log('Form data submitted:', data); 
        const newPost = {
            email,
            password
        };

        axios.post("http://127.0.0.1:8000/api/login", newPost)
    };

    return (
        <div className="signIn">
            <div className="centered-container">
                <h1>Sign in to your account</h1>
                <form onSubmit={handleSubmit}> 
                    <div className="form-group">
                        <label htmlFor="email">Email</label><br/>
                        <input onChange={handleInputChange} type="email" name="email" value={email} placeholder="Example@gmail.com" required/><br/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">password</label><br/>
                        <input onChange={handleInputChange} type="password" name="password" value={password} placeholder="Mypass1234" required/><br/>
                    </div>
                    {submitted && !error && (
                    <div className="success-message">Sign in successful! Redirecting...</div>
                )}
                {error && (
                    <div className="error-message">{errorMessage || 'An unexpected error occurred.'}</div>
                )}
                    <button type="submit" className="button">Sign In</button>
                    
                    
                </form> 
                <p>Don't have an account? click <span><a href="#" className="a">here</a></span></p>
            </div>
        </div>
    );
}

export default SignIn;