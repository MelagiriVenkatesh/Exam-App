import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Exam from './pages/Exam.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Results from './pages/Results.jsx'
import { Link } from 'react-router-dom';
import styles from './pages/Home.module.css';
import axios from 'axios'


function Home() {

  let flag = isTokenValid();
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.homeCard}>
        <h1>Welcome to the Exam Portal</h1>
        {flag ? (
          <Link to="/exam">
            <button>Start Exam</button>
          </Link>
        ) : (
          <p>Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to begin.</p>
        )}
      </div>
    </div>
  );
}

async function isTokenValid() {

    let token = localStorage.getItem("token");
    if(!token)
      return false;

    let isTokenValidUrl = import.meta.env.VITE_TOKEN_API_URL;
    const response = await axios.get(isTokenValid);
    console.log(response);
    return response.data.token;
}


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {isTokenValid() ? <Home/> : <Navigate to = "/login"/>}/>
        <Route path = '/login' element = {isTokenValid() ? <Navigate to = '/'/> : <Login/>}/>
        <Route path = '/register' element = {isTokenValid() ? <Navigate to = '/' /> :  <Register/>}/>
        <Route path="/exam" element={isTokenValid() ? <Exam/> : <Navigate to = "/login"/>}/>
        <Route path="/result" element={isTokenValid() ? <Results/> : <Navigate to = "/login"/>}/>
        <Route path = '*' element = {isTokenValid() ? <Navigate to = '/'/> : <Navigate to = '/login'/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App