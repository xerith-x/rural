const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    lesson_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} exceeds the limit of 4']
    },
    correct_answer: {
        type: String,
        required: true
    }
}, { timestamps: true });

function arrayLimit(val) {
    return val.length > 0;
}

module.exports = mongoose.model('Quiz', quizSchema);
