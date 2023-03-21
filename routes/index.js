const express = require('express');
const router = express.Router();

/* MAIN ROUTES */
router.use('/sport-schedule', require('./schedule'));
router.use('/user', require('./user'));

module.exports = router;