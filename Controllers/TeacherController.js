const TeacherModel = require('../Models/Teacher');
const UserModel = require('../Models/User');
const connectDB = require('../Models/db');

const addTeacher = async (req, res) => {
    try {
        await connectDB();

        const {
            teacherId,
            email,
            department,
            designation
        } = req.body;

        // Check if teacher ID already exists
        const existingTeacher = await TeacherModel.findOne({ teacherId });

        if (existingTeacher) {
            return res.status(409).json({
                message: 'Teacher ID already exists',
                success: false
            });
        }

        // Find user account
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'No user account found with this email',
                success: false
            });
        }

        // Make sure the user is a teacher
        if (user.role !== 'teacher') {
            return res.status(400).json({
                message: 'The selected user is not a teacher',
                success: false
            });
        }

        // Check if teacher profile already exists
        const existingProfile = await TeacherModel.findOne({
            user: user._id
        });

        if (existingProfile) {
            return res.status(409).json({
                message: 'Teacher profile already exists for this user',
                success: false
            });
        }

        // Create teacher profile
        const teacher = new TeacherModel({
            teacherId,
            user: user._id,
            department,
            designation
        });

        await teacher.save();

        res.status(201).json({
            message: 'Teacher added successfully',
            success: true,
            teacher
        });

    } catch (err) {
        console.error('ADD TEACHER ERROR:', err);

        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};


const getTeachers = async (req, res) => {
    try {
        await connectDB();

        const teachers = await TeacherModel
            .find()
            .populate('user', 'name email');

        res.status(200).json({
            success: true,
            teachers
        });

    } catch (err) {
        console.error('GET TEACHERS ERROR:', err);

        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};


module.exports = {
    addTeacher,
    getTeachers
};