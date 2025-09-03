const express = require('express');
const {Question} = require('./model');
const jwt = require("jsonwebtoken");

const questionRouter = express.Router();

function authMiddleWare(req, res, next) {

    const token = req.header('token');
    if(!token) 
        return res.status(401).json({message: "token not found"});

    try {
        const decodedPayload = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decodedPayload.user;
        next();
    }
    catch(error) {
        res.status(401).json({message: "Token is invalid"});
    }
}


questionRouter.get('/', authMiddleWare, async (req, res) => {

    try {
        const questions = await Question.aggregate([{$sample: {size: 10 }}, {$project: {correctAnswer:0}}]);
        res.json(questions);
    }
    catch(error) {
        res.json({message: `something went wrong ${error}`});
    }
});



questionRouter.post('/submit', authMiddleWare, async (req, res) => {

    try {
        const {answers} = req.body; 
        // format and contents of answer will be 
        // answer = [{questionID: ID, selectedAnswer: answer}, {questionID: ID, selectedAnswer: answer}, ...];

        const questionIDs = answers.map(q=>q.questionID);
        const correctAnswers = await Question.find({ _id : {$in: questionIDs }});
        
        let score = 0;

        answers.forEach(userAnswer => {
            const question = correctAnswers.find(q => q._id.toString() === userAnswer.questionID);
            if (question && question.correctAnswer === userAnswer.selectedAnswer) {
                score++;
            }
        });

        res.json({ score, total: correctAnswers.length });
    }
    catch(error) {
        res.status(500).json({ message: `Server error ${error}` });
    }
});



module.exports = questionRouter;