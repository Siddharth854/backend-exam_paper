const CourseModel = require('../Models/Course');
const connectDB = require('../Models/db');

const addCourse = async (req, res) => {
    try {
        await connectDB();

        const {
            courseCode,
            courseName,
            department,
            semester,
            examDuration
        } = req.body;

        const existingCourse = await CourseModel.findOne({ courseCode });

        if (existingCourse) {
            return res.status(409).json({
                message: 'Course code already exists',
                success: false
            });
        }

        const course = new CourseModel({
            courseCode,
            courseName,
            department,
            semester,
            examDuration
        });

        await course.save();

        res.status(201).json({
            message: 'Course added successfully',
            success: true,
            course
        });

    } catch (err) {
        console.error('ADD COURSE ERROR:', err);

        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};


const getCourses = async (req, res) => {
    try {
        await connectDB();

        const courses = await CourseModel.find();

        res.status(200).json({
            success: true,
            courses
        });

    } catch (err) {
        console.error('GET COURSES ERROR:', err);

        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};


module.exports = {
    addCourse,
    getCourses
};