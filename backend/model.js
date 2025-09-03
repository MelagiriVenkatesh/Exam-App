const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    }
});

const questionSchema = new mongoose.Schema({

    questionText: {
        type: String,
        required: true,
    },

    options: [{
        type: String,
        required: true,
    }],

    correctAnswer: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);


module.exports = {User, Question};
