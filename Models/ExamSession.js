const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExamSessionSchema = new Schema(
    {
        examCycle: {
            type: Schema.Types.ObjectId,
            ref: 'examcycles',
            required: true
        },

        sessionDate: {
            type: Date,
            required: true
        },

        startTime: {
            type: String,
            required: true
        },

        endTime: {
            type: String,
            required: true
        },

        sessionType: {
            type: String,
            enum: ['Morning', 'Afternoon', 'Evening'],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const ExamSessionModel = mongoose.model(
    'examsessions',
    ExamSessionSchema
);

module.exports = ExamSessionModel;