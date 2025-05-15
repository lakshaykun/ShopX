const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const OwnerModel = require('../models/ownerModel');

module.exports.isUserLoggedIn = async (req, res, next) => {
    if (!req.cookies.usertoken) {
        req.flash('error', 'You need to login first');
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(req.cookies.usertoken, process.env.JWT_SECRET);
        const user = await userModel.findOne({ _id: decoded._id }).select('-password -__v');

        if (!user) {
            req.flash('error', 'Something went wrong, please login again');
            return res.redirect('/');
        }

        req.user = user;
        next();
    } catch (err) {
        req.flash('error', 'Something went wrong, please login again');
        return res.redirect('/');
    }
};


module.exports.isOwnerLoggedIn = async (req, res, next) => {
    if (!req.cookies.ownertoken) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const decoded = jwt.verify(req.cookies.ownertoken, process.env.JWT_SECRET);
        const owner = await OwnerModel.findOne({ _id: decoded._id }).select('-password -__v');

        if (!owner) {
            console.log(decoded);
            return res.status(401).send("Unauthorized");
            // req.flash('error', 'Something went wrong, please login again');
            // return res.redirect('/');
        }

        req.owner = owner;
        console.log({ owner });
        next();
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }
};
