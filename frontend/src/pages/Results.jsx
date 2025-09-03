import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
        return <div>Loading...</div>;
    }
    
    const percentage = Math.round((result.score / result.total) * 100);

    return (
        <div>
            <h2>Exam Result</h2>
            <p>You scored</p>
            <h1>{result.score} out of {result.total}</h1>
            <h2>Percentage: {percentage}%</h2>
            <Link to="/exam">Retake Exam</Link>
        </div>
    );
};

export default Results;