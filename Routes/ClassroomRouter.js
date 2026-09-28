const router = require('express').Router();

const {
    addClassroom,
    getClassrooms
} = require('../Controllers/ClassroomController');

router.post('/add', addClassroom);

router.get('/', getClassrooms);

module.exports = router;