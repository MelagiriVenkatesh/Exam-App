import React, { useState } from 'react';
// CHANGED: useNavigate is no longer needed here
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Auth.module.css';

function Login({ login }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const login_api_url = import.meta.env.VITE_LOGIN_API_URL;
            const response = await axios.post(login_api_url, formData);
            
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
            
            // This now just updates the state. 
            // The useEffect in App.jsx will handle the redirect.
            login();
            
            // CHANGED: Removed the navigate('/') call from here.
        } catch (error) {
            const errorDetails = error.response?.data?.message || 'An error occurred.';
            alert(`Login Failed: ${errorDetails}`);
            console.error('Login failed:', errorDetails);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.authCard}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input type="email" name="email" placeholder="Email" required onChange={handleChange} value={formData.email} />
                    <input type="password" name="password" placeholder="Password" required onChange={handleChange} value={formData.password} />
                    <button type="submit">Login</button>
                </form>
                <p className={styles.footerText}>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;