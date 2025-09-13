const Post = require('../models/Post');

// Get all posts
const index = async (req, res) => {
    const posts = await Post.find().populate('author', 'name').sort({createAt : -1});
    res.render("index", { posts, user : req.user });
}

// Get post create form
const createForm = (req, res) => {
    res.render("create_post");
}

// Create a new post
const create = async (req, res) => {
    const { title, content } = req.body;
    const post = await Post.create({
        title, content, author : req.user._id
    });
    res.redirect('/posts/dashboard');
}

// Show user's posts
const userPosts = async (req, res) => {
    const posts = await Post.find({ author : req.user._id }).sort({createdAt : -1});
    res.render("dashboard_user", {posts, user : req.user});
    console.log(req.user.name);
}

// Get all user to Admin dashboard
const adminUsers = async (req, res) => {
    const User = require('../models/User');
    const users = await User.find().sort({ createdAt : -1 });
    res.render("dashboard_admin", { users, user : req.user });
}

module.exports = {
    index,
    createForm,
    create,
    userPosts,
    adminUsers
}