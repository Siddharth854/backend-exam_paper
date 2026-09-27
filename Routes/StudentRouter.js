const router = require('express').Router();

const { addStudent } = require('../Controllers/StudentController');

router.post('/add', addStudent);

module.exports = router;