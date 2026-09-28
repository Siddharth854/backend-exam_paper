const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClassroomSchema = new Schema(
    {
        roomNumber: {
            type: String,
            required: true,
            unique: true
        },

        building: {
            type: String,
            required: true
        },

        floor: {
            type: Number,
            required: true,
            min: 0
        },

        capacity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        timestamps: true
    }
);

const ClassroomModel = mongoose.model('classrooms', ClassroomSchema);

module.exports = ClassroomModel;