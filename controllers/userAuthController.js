const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken').generateToken;
const cookieParser = require('cookie-parser');


module.exports.registerUser = async (req, res) => {
    try {
        const { fullname, email, password, contact } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            console.log({ message: 'User already exists' });
            return res.redirect('/');
        }

        // Hash password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new userModel({
            fullname,
            email,
            password: hashedPassword,
            contact
        });

        await newUser.save();

        // Generate token and set cookie
        const token = generateToken(newUser);
        res.cookie('usertoken', token, { httpOnly: true, secure: true });

        console.log({ message: 'User registered successfully', user: newUser });
        return res.redirect('/');
    } catch (error) {
        console.error({ message: 'Error during registration', error: error.message });
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            console.log({ message: 'User not found' });
            return res.redirect('/');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log({ message: 'Incorrect password' });
            return res.redirect('/');
        }

        const token = generateToken(user);
        res.cookie('usertoken', token, { httpOnly: true });

        console.log({ message: 'User logged in successfully', user });
        return res.redirect('/');
    } catch (error) {
        console.error({ message: 'Login failed', error: error.message });
        return res.status(500).send('Internal Server Error');
    }
};