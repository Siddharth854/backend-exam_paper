const ExamSessionModel = require('../Models/ExamSession');
const ExamCycleModel = require('../Models/ExamCycle');
const connectDB = require('../Models/db');

const addExamSession = async (req, res) => {
    try {
        await connectDB();

        const {
            examCycle,
            sessionDate,
            startTime,
            endTime,
            sessionType
        } = req.body;

        // Check that the exam cycle exists
        const cycle = await ExamCycleModel.findById(examCycle);

        if (!cycle) {
            return res.status(404).json({
                message: 'Exam cycle not found',
                success: false
            });
        }

        // Validate time
        if (startTime >= endTime) {
            return res.status(400).json({
                message: 'Start time must be before end time',
                success: false
            });
        }

        // Check that session date falls inside exam cycle
        const sessionDateValue = new Date(sessionDate);
        const cycleStart = new Date(cycle.startDate);
        const cycleEnd = new Date(cycle.endDate);

        if (
            sessionDateValue < cycleStart ||
            sessionDateValue > cycleEnd
        ) {
            return res.status(400).json({
                message: 'Session date must be within the exam cycle dates',
                success: false
            });
        }

        // Check duplicate session
        const existingSession = await ExamSessionModel.findOne({
            examCycle,
            sessionDate: sessionDateValue,
            startTime,
            endTime
        });

        if (existingSession) {
            return res.status(409).json({
                message: 'Exam session already exists',
                success: false
            });
        }

        const examSession = new ExamSessionModel({
            examCycle,
            sessionDate: sessionDateValue,
            startTime,
            endTime,
            sessionType
        });

        await examSession.save();

        res.status(201).json({
            message: 'Exam session added successfully',
            success: true,
            examSession
        });

    } catch (err) {
        console.error('ADD EXAM SESSION ERROR:', err);

        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};


const getExamSessions = async (req, res) => {
    try {
        await connectDB();

        const examSessions = await ExamSessionModel
            .find()
            .populate(
                'examCycle',
                'cycleName academicYear semester examType'
            )
            .sort({
                sessionDate: 1,
                startTime: 1
            });

        res.status(200).json({
            success: true,
            examSessions
        });

    } catch (err) {
        console.error('GET EXAM SESSIONS ERROR:', err);

        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};


module.exports = {
    addExamSession,
    getExamSessions
};