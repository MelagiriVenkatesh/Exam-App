const express = require('express');
const jwt = require('jsonwebtoken');
const {User} = require('./model.js');
const bcrypt = require('bcryptjs');


const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {

    try {
        const {username, email, password} = req.body;
        let foundUser = await User.findOne({email});
        
        if(foundUser) {
            return res.status(400).json({message: "user with this email already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "user registered successfully" });
    }
    catch(error) {
        res.json({message: `error occured ${error}`});
    }

});




authRouter.post('/login', async (req, res) => {

    try {
        let {email, password} = req.body;
        let foundUser = await User.findOne({ email });

        if(!foundUser)
            return res.status(400).json({ message: "no user exist with the given email"});

        const hashedPassword = foundUser.password;
        const passwordMatched = await bcrypt.compare(password, hashedPassword);

        if(!passwordMatched)
            return res.status(400).json({ message: "password is wrong"});

        const payload = {
            user : {
                id: foundUser._id,
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({token});
    }
    catch(error) {
        res.json({message: "something went wrong "+error});
    }
});


module.exports = authRouter;