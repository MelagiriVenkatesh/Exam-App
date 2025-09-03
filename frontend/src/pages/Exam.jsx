import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Timer from '../components/Timer';
import Navbar from '../components/Navbar';
import styles from './Exam.module.css';

const Exam = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem('token');
                const questions_api_url = import.meta.env.VITE_EXAM_API_URL; 
                const response = await axios.get(questions_api_url, { headers: { 'token': token, }, });
                setQuestions(response.data);
            } catch (err) {
                setError('Failed to fetch questions. Please try again.');
                console.error('Fetch questions error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const handleAnswerSelect = (questionId, selectedOption) => {
        setUserAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: selectedOption, }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };
    
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const submit_api_url = import.meta.env.VITE_SUBMIT_API_URL;
            const formattedAnswers = Object.entries(userAnswers).map(([questionId, selectedAnswer]) => ({
                questionID: questionId,
                selectedAnswer: selectedAnswer
            }));
            const response = await axios.post(submit_api_url, { answers: formattedAnswers }, { headers: { 'token': token } });
            sessionStorage.setItem('examResult', JSON.stringify({ score: response.data.score, total: response.data.total }));
            navigate('/result');
        } catch (err) {
            alert('There was an error submitting your exam.');
            console.error('Submit error:', err);
        }
    };

    if (loading) return <div className={styles.pageWrapper}>Loading...</div>;
    if (error) return <div className={styles.pageWrapper}><div className={styles.examCard}>{error}</div></div>;
    if (questions.length === 0) return <div className={styles.pageWrapper}><div className={styles.examCard}>No questions available.</div></div>;

    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = userAnswers[currentQuestion._id];

    return (
        <>
            <Navbar />
            <div className={styles.pageWrapper}>
                <div className={styles.contentContainer}>
                    <Timer duration={1800} onTimeUp={handleSubmit} />
                    <div className={styles.examCard}>
                        <div className={styles.questionHeader}>
                            <h3>Question {currentQuestionIndex + 1}/{questions.length}</h3>
                        </div>
                        <p className={styles.questionText}>{currentQuestion.questionText}</p>
                        <div className={styles.optionsContainer}>
                            {currentQuestion.options.map((option, index) => (
                                <label key={index} className={styles.option}>
                                    <input type="radio" name={currentQuestion._id} value={option} checked={selectedAnswer === option} onChange={() => handleAnswerSelect(currentQuestion._id, option)} />
                                    {option}
                                </label>
                            ))}
                        </div>
                        <div className={styles.navigation}>
                            <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className={styles.navButton}>
                                Previous
                            </button>
                            {currentQuestionIndex === questions.length - 1 ? (
                                <button onClick={handleSubmit}>Submit</button>
                            ) : (
                                <button onClick={handleNext}>Next</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Exam;