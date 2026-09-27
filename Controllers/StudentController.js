const StudentModel = require('../Models/Student');
const UserModel = require('../Models/User');
const connectDB = require('../Models/db');

const addStudent = async (req, res) => {
    try {
        await connectDB();

        const {
            studentId,
            email,
            department,
            semester
        } = req.body;

        // Check whether student ID already exists
        const existingStudent = await StudentModel.findOne({ studentId });

        if (existingStudent) {
            return res.status(409).json({
                message: 'Student ID already exists',
                success: false
            });
        }

        // Find the existing user account
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'No user account found with this email',
                success: false
            });
        }

        // Make sure the account belongs to a student
        if (user.role !== 'student') {
            return res.status(400).json({
                message: 'The selected user is not a student',
                success: false
            });
        }

        // Check whether this user already has a student profile
        const existingProfile = await StudentModel.findOne({
            user: user._id
        });

        if (existingProfile) {
            return res.status(409).json({
                message: 'Student profile already exists for this user',
                success: false
            });
        }

        // Create student profile
        const student = new StudentModel({
            studentId,
            user: user._id,
            department,
            semester
        });

        await student.save();

        res.status(201).json({
            message: 'Student added successfully',
            success: true,
            student
        });

    } catch (err) {
        console.error('ADD STUDENT ERROR:', err);

        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};

const getStudents = async (req, res) => {
    try {
        await connectDB();

        const students = await StudentModel
            .find()
            .populate('user', 'name email'); // tell mongo db that give me the student's name and email from the users collection.

        res.status(200).json({
            success: true,
            students
        });

    } catch (err) {
        console.error('GET STUDENTS ERROR:', err);

        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};

module.exports = {
    addStudent,
    getStudents
};