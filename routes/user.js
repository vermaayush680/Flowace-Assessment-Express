const express = require('express');
const router = express.Router();
const { registerUser, getUsers } = require('../controllers/user');

/* User Routes */
router.post('/create', registerUser); 
router.get('/',getUsers);

module.exports = router;