const express = require('express');
const router = express.Router();
const postController = require('../controllers/postControlller');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/create', auth, role('user'), postController.createForm);
router.post('/create', auth, role('user'), postController.create);

// Route for user dashboard
router.get('/dashboard', auth, role('user'), postController.userPosts);

// Route for admin dashboard
router.get('/admin', auth, role('admin'), postController.adminUsers);

module.exports = router;