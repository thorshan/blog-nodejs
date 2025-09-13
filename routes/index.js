const express = require('express');
const router = express.Router();
const postController = require('../controllers/postControlller');
const auth = require('../middleware/auth');

router.get('/', auth, postController.index);

module.exports = router;