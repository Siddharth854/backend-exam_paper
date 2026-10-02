const express = require('express');

const router = express.Router();

const {
    addExamSession,
    getExamSessions
} = require('../Controllers/ExamSessionController');

router.post('/add', addExamSession);

router.get('/', getExamSessions);

module.exports = router;