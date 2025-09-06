require('dotenv').config();
const connectDB = require('./config.js');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authRouter = require('./auth.js');
const questionRouter = require('./questions.js');
const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: 'https://venkatesh-exam-portal.vercel.app',
    credentials: true, 
};

app.use(express.json());
app.use(cors(corsOptions));

connectDB();

app.use('/api/auth', authRouter);
app.use('/api/questions', questionRouter);

app.get('/', (req, res) => {
    res.send("Hello World!!!");
});

app.get('/api/auth/validate-token', (req, res) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        
        return res.status(401).json({ valid: false, message: 'No token provided.' });
    }
    
    const token = authHeader.split(' ')[1];

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        // Token is valid
        return res.status(200).json({ valid: true });
    } catch (error) {
        return res.status(401).json({ valid: false, message: 'Invalid token.' });
    }
});

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});