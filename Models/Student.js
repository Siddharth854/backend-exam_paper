const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema(
    {
        studentId: {
            type: String,
            required: true,
            unique: true
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
            unique: true
        },

        department: {
            type: String,
            required: true
        },

        semester: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        timestamps: true
    }
);

const StudentModel = mongoose.model('students', StudentSchema);

module.exports = StudentModel;