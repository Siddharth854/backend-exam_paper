const express = require('express');

const router = express.Router();

const {
    addExamCycle,
    getExamCycles
} = require('../Controllers/ExamCycleController');

router.post('/add', addExamCycle);

router.get('/', getExamCycles);

module.exports = router;