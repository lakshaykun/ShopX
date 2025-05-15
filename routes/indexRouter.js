const express = require('express');
const router = express.Router();
const { isUserLoggedIn } = require("../middlewares/isLoggedIn");


router.get('/', (req, res) => {
    res.status(200).send('Route is working');
})

router.get("/shop", isUserLoggedIn, (req, res) => {
    res.status(200).send('Route is working');
})

module.exports = router;