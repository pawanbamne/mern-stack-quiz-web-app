const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: false // Optional for now (until we add Login/Signup)
    },
    score: { type: Number, required: true },
    correct: { type: Number, required: true },
    wrong: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);