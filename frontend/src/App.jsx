import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { checkTokenValidity } from './auth';

// Import Pages
import Home from './pages/Home';
import Exam from './pages/Exam';
import Login from './pages/Login';
import Register from './pages/Register';
import Results from './pages/Results';

// Import Route Guards
import PrivateRoutes from './components/PrivateRoutes';
import PublicRoutes from './components/PublicRoutes';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState('loading');

    useEffect(() => {
        const validateToken = async () => {
            const isValid = await checkTokenValidity();
            setIsAuthenticated(isValid);
        };
        validateToken();
    }, []);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    if (isAuthenticated === 'loading') {
        return <div>Loading application...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes that are only accessible when logged out */}
                <Route path="/login" element={<PublicRoutes isAuthenticated={isAuthenticated}><Login login={login} /></PublicRoutes>} />
                <Route path="/register" element={<PublicRoutes isAuthenticated={isAuthenticated}><Register /></PublicRoutes>} />

                {/* Private routes that are only accessible when logged in */}
                <Route path="/" element={<PrivateRoutes isAuthenticated={isAuthenticated}><Home logout={logout} /></PrivateRoutes>} />
                <Route path="/exam" element={<PrivateRoutes isAuthenticated={isAuthenticated}><Exam logout={logout} /></PrivateRoutes>} />
                <Route path="/result" element={<PrivateRoutes isAuthenticated={isAuthenticated}><Results logout={logout} /></PrivateRoutes>} />
                
                {/* A catch-all route that redirects logged-in users to home, and logged-out to login */}
                <Route path="*" element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;