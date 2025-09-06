import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Exam from './pages/Exam.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Results from './pages/Results.jsx'
import { Link } from 'react-router-dom';
import styles from './pages/Home.module.css';
import axios from 'axios'

function PublicRoutes({ children }) {

    let token = isTokenValid();
    if(token)
      return <Navigate to = "/"/>

    return children;
}


function PrivateRoutes({ children }) {

    let token = isTokenValid();
    if(!token)
      return <Navigate to = '/login'/>
    return children;
}

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

function UnknownPathComponent() {

   let token = isTokenValid();
   if(token)
      return <Navigate to = "/"/>;
   else
      return <Navigate to = "login"/>;
}

async function isTokenValid() {

    let token = localStorage.getItem("token");
    if(token == null || token == undefined || token == '' || token == NaN)
      return false;

    let isTokenValidUrl = import.meta.env.VITE_TOKEN_API_URL;
    const response = await axios.get(isTokenValidUrl);
    console.log(response);
    return response.data.token;
}


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path = '/login' element = {<PublicRoutes> <Login/> </PublicRoutes>}/>
          <Route path = '/register' element = {<PublicRoutes> <Register/> </PublicRoutes>}/>
          <Route path = '/' element = {<PrivateRoutes> <Home/> </PrivateRoutes>}/>
          <Route path="/exam" element={<PrivateRoutes> <Exam/> </PrivateRoutes>}/>
          <Route path="/result" element={<PrivateRoutes> <Results/> </PrivateRoutes>}/>
          <Route path = '*' element = {<UnknownPathComponent/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App