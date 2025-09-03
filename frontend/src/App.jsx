import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Exam from './pages/Exam.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Results from './pages/Results.jsx'
import { Link } from 'react-router-dom';

function Home() {
  const token = localStorage.getItem('token');

  return (
    <div>
      <h1>Welcome to the Exam Portal</h1>
      {token ? (
        <Link to="/exam">
          <button>Start Exam</button>
        </Link>
      ) : (
        <p>Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to begin.</p>
      )}
    </div>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path = '/' element = {<Home/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/register' element = {<Register/>}/>
        
        <Route path="/exam" element={<Exam/>}/>
        <Route path="/result" element={<Results/>}/>

        {/* If Unknow path found then just redirect user to Home Page. */}
        <Route path = '*' element = {<Navigate to = '/'/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App