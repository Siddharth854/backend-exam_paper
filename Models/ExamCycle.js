const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExamCycleSchema = new Schema(
    {
        cycleName: {
            type: String,
            required: true,
            unique: true
        },

        academicYear: {
            type: String,
            required: true
        },

        semester: {
            type: Number,
            required: true,
            min: 1
        },

        examType: {
            type: String,
            enum: ['Mid Semester', 'End Semester', 'Supplementary'],
            required: true
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ['Upcoming', 'Active', 'Completed'],
            default: 'Upcoming'
        }
    },
    {
        timestamps: true
    }
);

const ExamCycleModel = mongoose.model('examcycles', ExamCycleSchema);

module.exports = ExamCycleModel;