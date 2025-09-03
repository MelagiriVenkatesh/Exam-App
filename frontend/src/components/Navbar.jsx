import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('examResult'); 
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