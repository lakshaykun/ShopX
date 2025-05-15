const OwnerModel = require('../models/ownerModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken').generateToken;
const cookieParser = require('cookie-parser');


module.exports.registerOwner = async (req, res) => {
    try {
        const { fullname, email, password, contact } = req.body;

        // Check if Owner already exists
        const existingOwner = await OwnerModel.findOne({ email });
        if (existingOwner) {
            console.log({ message: 'Owner already exists' });
            res.status(400).send('Owner already exists');
            // return res.redirect('/');
        }

        // Hash password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create Owner
        const newOwner = new OwnerModel({
            fullname,
            email,
            password: hashedPassword,
            contact
        });

        await newOwner.save();

        // Generate token and set cookie
        const token = generateToken(newOwner);
        res.cookie('ownertoken', token, { httpOnly: true, secure: true });

        console.log({ message: 'Owner registered successfully', Owner: newOwner });
        return res.redirect('/');
    } catch (error) {
        console.error({ message: 'Error during registration', error: error.message });
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.loginOwner = async (req, res) => {
    try {
        const { email, password } = req.body;

        const Owner = await OwnerModel.findOne({ email });
        if (!Owner) {
            console.log({ message: 'Owner not found' });
            return res.redirect('/');
        }

        const isMatch = await bcrypt.compare(password, Owner.password);
        if (!isMatch) {
            console.log({ message: 'Incorrect password' });
            return res.redirect('/');
        }

        const token = generateToken(Owner);
        res.cookie('ownertoken', token, { httpOnly: true, secure: true });

        console.log({ message: 'Owner logged in successfully', Owner });
        return res.redirect('/');
    } catch (error) {
        console.error({ message: 'Login failed', error: error.message });
        return res.status(500).send('Internal Server Error');
    }
};