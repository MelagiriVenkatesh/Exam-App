
require('dotenv').config();
const connectDB = require('./config.js');
const express = require('express');
const cors = require('cors');
const authRouter = require('./auth.js');
const questionRouter = require('./questions.js');
const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: 'https://venkatesh-exam-portal.vercel.app',
}

app.use(express.json());
app.use(cors(corsOptions));

connectDB();

app.use('/api/auth', authRouter);
app.use('/api/questions', questionRouter);

app.get('/', (req, res) => {
    res.send("Hello World!!!");
})

app.get('/tokenValid', (req, res) => {

    const token = req.header('token');
    if(!token) 
        return res.status(200).json({token: false});

    try {
        const decodedPayload = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decodedPayload.user;
        return res.status(200).json({token: true});
    }
    catch(error) {
        res.status(200).json({token: false});
    }
})

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
