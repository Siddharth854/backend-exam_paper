const router = require('express').Router();

const {
    addStudent,
    getStudents
} = require('../Controllers/StudentController');

router.post('/add', addStudent);

router.get('/', getStudents);

module.exports = router;