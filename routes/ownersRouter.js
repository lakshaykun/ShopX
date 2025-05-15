const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownerModel');
const { registerOwner, loginOwner } = require('../controllers/ownerAuthController');

router.get('/', (req, res) => {
    res.status(200).send('Route is working');
})

router.post('/register', registerOwner);

router.post('/login', loginOwner);

router.get('/logout', (req, res) => {
    res.clearCookie('ownertoken');
    return res.redirect('/');
});

module.exports = router;