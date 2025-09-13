require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createToken = (user) => {
    return jwt.sign({
        id : user._id,
        role : user.role
    }, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRES || '7d'});
}

// Get Register Page
const showRegister = (req, res) => {
    res.render("register");
}

// Get Login Page
const showLogin = (req, res) => {
    res.render("login");
}

// Register new user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({email});

        // Check if there is any existing user with that email address.
        if(user) return res.status(400).render("register", {error : "Email already registered, try another address"});
        const hashedPass = await bcrypt.hash(password, 10);
        user = await User.create({
            name, email, password : hashedPass
        });
        const token = createToken(user);
        res.cookie('token', token, {httpOnly : true});
        res.redirect('/');
    } catch (error) {
        res.status(500).render("500", { error : "Server error"});
    }
}

// User Authentication
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).render("login", { error : "Invalid Credientials"});
        const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.redirect("/auth/login");
          }
        const token = createToken(user);
        res.cookie('token', token, { httpOnly : true });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).render("500", { error : "Server Error"});
    }
}

// Logout function
const logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
}

module.exports = {
    showRegister,
    showLogin,
    register,
    login,
    logout
}