import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {

    const {name, value} = e.target;
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
    }));

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const register_api_url = import.meta.env.VITE_REGISTER_API_URL;
        await axios.post(register_api_url, formData);

        alert('Registration successful! Please log in.');
        navigate('/login');
    } 
    catch (error) {

        setFormData(prevFormData =>({
            username: '',
            email: '',
            password: '',
        }));

        const errorDetails = error.response.data.message;
        alert(`Registration failed. ${errorDetails}`);
        console.log('Registration error:', errorDetails);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type = "text"
          name = "username"
          placeholder = "Username"
          required
          onChange = {handleChange}
          value = {formData.username}
        />
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
        <button type = "submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;