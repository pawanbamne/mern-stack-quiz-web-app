const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }], // Array of 4 strings
    correctOption: { type: Number, required: true }, // Index (0-3)
    category: { type: String, default: 'General' },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' }
});

module.exports = mongoose.model('Question', questionSchema);