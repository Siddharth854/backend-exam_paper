const router = require('express').Router();

const {
    addCourse,
    getCourses
} = require('../Controllers/CourseController');

router.post('/add', addCourse);

router.get('/', getCourses);

module.exports = router;