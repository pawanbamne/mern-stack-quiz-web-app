const express = require('express');
const router = express.Router();
const { getQuestions, submitTest } = require('../controllers/testController');

// @route   GET /api/tests/questions
// @desc    Get 10 random questions
// @access  Public (or Private if you add auth middleware later)
router.get('/questions', getQuestions);

// @route   POST /api/tests/submit
// @desc    Submit answers and get score
// @access  Public
router.post('/submit', submitTest);

module.exports = router;