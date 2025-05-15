const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/userAuthController').registerUser;
const loginUser = require('../controllers/userAuthController').loginUser;

router.get('/', (req, res) => {
    res.send('Route is working');
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', (req, res) => {
    res.clearCookie('usertoken');
    res.redirect('/');
});

module.exports = router;