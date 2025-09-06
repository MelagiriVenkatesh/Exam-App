import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

// CHANGED: Navbar now receives the `logout` function as a prop
const Navbar = ({ logout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('examResult');
        // CHANGED: Call the logout function from App.js to update the state
        logout();
        navigate('/login');
    };

    return (
        <header className={styles.navbar}>
            <div className={styles.navbarContent}>
                <span className={styles.brand}>Exam Portal</span>
                <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </div>
        </header>
    );
};

export default Navbar;