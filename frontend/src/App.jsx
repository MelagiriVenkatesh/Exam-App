import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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

// We create a child component to use the navigate hook,
// because hooks can only be used inside the Router context.
function AppContent() {
    const [isAuthenticated, setIsAuthenticated] = useState('loading');
    const navigate = useNavigate();

    // This effect runs once on initial load to check the token
    useEffect(() => {
        const validateToken = async () => {
            const isValid = await checkTokenValidity();
            setIsAuthenticated(isValid);
        };
        validateToken();
    }, []);

    // This effect runs whenever `isAuthenticated` changes.
    // It handles navigation *after* a successful login.
    useEffect(() => {
        if (isAuthenticated === true) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    if (isAuthenticated === 'loading') {
        return <div>Loading application...</div>;
    }

    return (
        <Routes>
            {/* Public routes that are only accessible when logged out */}
            <Route path="/login" element={<PublicRoutes isAuthenticated={isAuthenticated}><Login login={login} /></PublicRoutes>} />
            <Route path="/register" element={<PublicRoutes isAuthenticated={isAuthenticated}><Register /></PublicRoutes>} />

            {/* Private routes that are only accessible when logged in */}
            <Route path="/" element={<PrivateRoutes isAuthenticated={isAuthenticated}><Home logout={logout} /></PrivateRoutes>} />
            <Route path="/exam" element={<PrivateRoutes isAuthenticated={isAuthenticated}><Exam logout={logout} /></PrivateRoutes>} />
            <Route path="/result" element={<PrivateRoutes isAuthenticated={isAuthenticated}><Results logout={logout} /></PrivateRoutes>} />
            
            {/* A catch-all route */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

// The main App component now just wraps AppContent with the Router
const App = () => {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
};

export default App;