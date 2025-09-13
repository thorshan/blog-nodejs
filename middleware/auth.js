require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies && req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
        if(!token) return res.status(403).render("403"); // Check if there is token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if(!user) return res.status(403).render("403"); // Check if there is user

        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        return res.status(403).render("403");
    }
}

module.exports = auth;