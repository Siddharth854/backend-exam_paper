const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        courseCode: {
            type: String,
            required: true,
            unique: true
        },

        courseName: {
            type: String,
            required: true
        },

        department: {
            type: String,
            required: true
        },

        semester: {
            type: Number,
            required: true,
            min: 1
        },

        examDuration: {
            type: Number,
            required: true,
            min: 30
        }
    },
    {
        timestamps: true
    }
);

const CourseModel = mongoose.model('courses', CourseSchema);

module.exports = CourseModel;