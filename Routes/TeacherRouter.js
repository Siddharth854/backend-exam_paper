const router = require('express').Router();

const {
    addTeacher,
    getTeachers
} = require('../Controllers/TeacherController');

router.post('/add', addTeacher);

router.get('/', getTeachers);

module.exports = router;