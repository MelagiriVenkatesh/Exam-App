const express = require('express');
const { Question } = require('./model');
const jwt = require("jsonwebtoken");

const questionRouter = express.Router();

function authMiddleWare(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedPayload.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token." });
    }
}

questionRouter.get('/', authMiddleWare, async (req, res) => {
    try {
        const questions = await Question.aggregate([
            { $sample: { size: 10 } },
            { $project: { correctAnswer: 0 } }
        ]);
        res.json(questions);
    } catch (error) {
        console.error(error); // Log error on server
        res.status(500).json({ message: "Something went wrong fetching questions." }); // Send generic message
    }
});

questionRouter.post('/submit', authMiddleWare, async (req, res) => {
    try {
        const { answers } = req.body;
        const questionIDs = answers.map(q => q.questionID);
        const correctAnswers = await Question.find({ _id: { $in: questionIDs } });

        // CHANGED: Made score calculation more efficient using a Map
        const correctAnswersMap = new Map(
            correctAnswers.map(q => [q._id.toString(), q.correctAnswer])
        );

        let score = 0;
        answers.forEach(userAnswer => {
            const correctAnswer = correctAnswersMap.get(userAnswer.questionID);
            if (correctAnswer === userAnswer.selectedAnswer) {
                score++;
            }
        });

        res.json({ score, total: correctAnswers.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during submission." });
    }
});

module.exports = questionRouter;