const ClassroomModel = require('../Models/Classroom');
const connectDB = require('../Models/db');

const addClassroom = async (req, res) => {
    try {
        await connectDB();

        const {
            roomNumber,
            building,
            floor,
            capacity
        } = req.body;

        const existingClassroom = await ClassroomModel.findOne({
            roomNumber
        });

        if (existingClassroom) {
            return res.status(409).json({
                message: 'Room number already exists',
                success: false
            });
        }

        const classroom = new ClassroomModel({
            roomNumber,
            building,
            floor,
            capacity
        });

        await classroom.save();

        res.status(201).json({
            message: 'Classroom added successfully',
            success: true,
            classroom
        });

    } catch (err) {
        console.error('ADD CLASSROOM ERROR:', err);

        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};


const getClassrooms = async (req, res) => {
    try {
        await connectDB();

        const classrooms = await ClassroomModel.find();

        res.status(200).json({
            success: true,
            classrooms
        });

    } catch (err) {
        console.error('GET CLASSROOMS ERROR:', err);

        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};


module.exports = {
    addClassroom,
    getClassrooms
};