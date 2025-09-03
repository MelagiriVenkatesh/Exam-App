
require('dotenv').config();
const connectDB = require('./config.js');
const express = require('express');
const cors = require('cors');
const authRouter = require('./auth.js');
const questionRouter = require('./questions.js');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/auth', authRouter);
app.use('/api/questions', questionRouter);

app.get('/', (req, res) => {
    res.send("Hello World!!!");
})

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
