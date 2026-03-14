const mongoose = require('mongoose');

const studentProgressSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lesson_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'completed'
    }
}, { timestamps: true });

// Ensure a student has only one progress record per lesson
studentProgressSchema.index({ student_id: 1, lesson_id: 1 }, { unique: true });

module.exports = mongoose.model('StudentProgress', studentProgressSchema);
