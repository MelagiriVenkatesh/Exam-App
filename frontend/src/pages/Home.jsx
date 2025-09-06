import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Navbar from '../components/Navbar';

// Home component now receives the logout function as a prop
function Home({ logout }) {
    return (
        <>
            <Navbar logout={logout} />
            <div className={styles.homeWrapper}>
                <div className={styles.homeCard}>
                    <h1>Welcome to the Exam Portal</h1>
                    <p>You are logged in. You can start the exam now.</p>
                    <Link to="/exam">
                        <button>Start Exam</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Home;