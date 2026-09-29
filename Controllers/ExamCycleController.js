const ExamCycleModel = require('../Models/ExamCycle');
const connectDB = require('../Models/db');

const addExamCycle = async (req, res) => {
    try {
        await connectDB();

        const {
            cycleName,
            academicYear,
            semester,
            examType,
            startDate,
            endDate,
            status
        } = req.body;

        // Check if cycle already exists
        const existingCycle = await ExamCycleModel.findOne({
            cycleName
        });

        if (existingCycle) {
            return res.status(409).json({
                message: 'Exam cycle already exists',
                success: false
            });
        }

        // Validate date range
        if (new Date(startDate) > new Date(endDate)) {
            return res.status(400).json({
                message: 'Start date cannot be after end date',
                success: false
            });
        }

        const examCycle = new ExamCycleModel({
            cycleName,
            academicYear,
            semester,
            examType,
            startDate,
            endDate,
            status: status || 'Upcoming'
        });

        await examCycle.save();

        res.status(201).json({
            message: 'Exam cycle added successfully',
            success: true,
            examCycle
        });

    } catch (err) {
        console.error('ADD EXAM CYCLE ERROR:', err);

        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};


const getExamCycles = async (req, res) => {
    try {
        await connectDB();

        const examCycles = await ExamCycleModel
            .find()
            .sort({ startDate: 1 });

        res.status(200).json({
            success: true,
            examCycles
        });

    } catch (err) {
        console.error('GET EXAM CYCLES ERROR:', err);

        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};


module.exports = {
    addExamCycle,
    getExamCycles
};