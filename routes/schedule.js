const express = require('express');
const router = express.Router();
const { createSchedule, getSchedules } = require('../controllers/schedule');

/* Schedule Routes */
router.post('/create', createSchedule);
router.get('/:id',getSchedules);

module.exports = router;