import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Auth.module.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const login_api_url = import.meta.env.VITE_LOGIN_API_URL;
        const response = await axios.post(login_api_url, formData);
        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
        navigate('/');
    } 
    catch (error) {
        setFormData({
            email: '',
            password: '',
        });
        const errorDetails = error.response.data.message;
        alert(`Login Failed, ${errorDetails}`);
        console.log('Login failed. Please check your credentials.\n', errorDetails);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.authCard}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type = "email"
            name = "email"
            placeholder = "Email"
            required
            onChange = {handleChange}
            value = {formData.email}
          />
          <input
            type = "password"
            name = "password"
            placeholder = "Password"
            required
            onChange = {handleChange}
            value = {formData.password}
          />
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