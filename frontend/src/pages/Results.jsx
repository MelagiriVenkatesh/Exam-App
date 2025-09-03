import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from './Exam.module.css';

const Results = () => {
    const navigate = useNavigate();
    const [result, setResult] = useState(() => {
        const savedResult = sessionStorage.getItem('examResult');
        if (savedResult) {
            return JSON.parse(savedResult);
        }
        return null;
    });

    useEffect(() => {
        if (!result) {
            navigate('/exam');
        }
    }, [result, navigate]);

    if (!result) {
        return <div className={styles.pageWrapper}>Loading...</div>;
    }
    
    const percentage = Math.round((result.score / result.total) * 100);

    return (
        <>
            <Navbar />
            <div className={styles.pageWrapper}>
                <div className={styles.contentContainer} style={{ textAlign: 'center' }}>
                    <div className={styles.examCard}>
                        <h2>Exam Result</h2>
                        <p>You scored</p>
                        <h1 style={{ fontSize: '4rem', margin: '20px 0' }}>{result.score} / {result.total}</h1>
                        <h3>Percentage: {percentage}%</h3>
                        <Link to="/exam">
                            <button>Retake Exam</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Results;