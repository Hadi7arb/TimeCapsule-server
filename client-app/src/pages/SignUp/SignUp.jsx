import { useState } from 'react';
import './SignUp.css';
import axios from 'axios';

const SignUp = () => {
    const [data, setData] = useState({
        fullName: '',  
        email: '',
        password: '',
        password_confirmation: ''  
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false); 
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { fullName, email, password, password_confirmation } = data;

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!fullName || !email || !password || !password_confirmation) {
            setError(true);
            setErrorMessage('All fields are required.');
            setIsLoading(false);
            return;
        }

        if (password !== password_confirmation) {
            setError(true);
            setErrorMessage('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register", data);
            
            
            const token = response.data.token;
            localStorage.setItem('authToken', token);
            
            
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setSubmitted(true);
            setError(false);

        } catch (err) {
            setError(true);
            setErrorMessage(
                err.response?.data?.message || 
                'Registration failed. Please try again.'
            );
            console.error('Registration error:', err.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='signUp'>
            <div className='centered-container'>
                <h1>Create an account</h1>
                <form onSubmit={handleSubmit}> 
                    <div className='form-group'>
                        <label htmlFor="fullName">Name</label><br/> 
                        <input 
                            onChange={handleInputChange} 
                            type="text" 
                            name="fullName" 
                            value={fullName} 
                            placeholder="Firstname Lastname" 
                            required
                        /><br/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label><br/> 
                        <input 
                            onChange={handleInputChange} 
                            type="email" 
                            name="email" 
                            value={email} 
                            placeholder="Example@gmail.com" 
                            required
                        /><br/>
                    </div>
                    
                    <div className='form-row'>
                        <div className='form-group'>
                            <label htmlFor="password">Password</label><br/> 
                            <input 
                                onChange={handleInputChange} 
                                type="password" 
                                name="password" 
                                value={password} 
                                placeholder="Mypass1234" 
                                required
                            /><br/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password_confirmation">Confirm password</label><br/> 
                            <input 
                                onChange={handleInputChange} 
                                type="password" 
                                name="password_confirmation" 
                                value={password_confirmation} 
                                placeholder="Mypass1234" 
                                required
                            /><br/><br/>
                        </div>
                    </div>
                    {submitted && !error && (
                        <div className="success-message">
                            Registration successful! You can now login.
                        </div>
                    )}
                    {error && (
                        <div className="error-message">
                            {errorMessage}
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        className='button'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Sign Up'}
                    </button> 
                </form>
                <p>Already have an account? <a href="/login" className='a'>Login</a></p>
            </div>
        </div>
    );
}

export default SignUp;