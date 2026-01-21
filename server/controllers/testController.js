const Question = require('../models/Question');
const Result = require('../models/Result');

// @desc    Get all questions for a test
// @route   GET /api/tests/questions
exports.getQuestions = async (req, res) => {
    try {
        // Fetch 10 random questions
        const questions = await Question.aggregate([{ $sample: { size: 10 } }]);
        
        // Hide correctOption from frontend for security
        const sanitizedQuestions = questions.map(q => ({
            _id: q._id,
            question: q.question,
            options: q.options,
            // We do NOT send correctOption here
        }));

        res.json(sanitizedQuestions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Submit Test & Calculate Score
// @route   POST /api/tests/submit
exports.submitTest = async (req, res) => {
    const { answers, userId } = req.body; 
    // answers format: [{ questionId: "123", selectedOption: 1 }, ...]

    try {
        let score = 0;
        let correct = 0;
        let wrong = 0;

        // Fetch all questions that were answered
        const questionIds = answers.map(a => a.questionId);
        const questions = await Question.find({ _id: { $in: questionIds } });

        // Calculate Score
        answers.forEach(ans => {
            const question = questions.find(q => q._id.toString() === ans.questionId);
            if (question) {
                if (question.correctOption === ans.selectedOption) {
                    score += 1; // +1 for correct
                    correct++;
                } else {
                    wrong++;
                }
            }
        });

        // Save Result to DB
        const result = await Result.create({
            userId,
            score,
            correct,
            wrong,
            totalQuestions: questions.length
        });

        res.json({ success: true, score, correct, wrong, resultId: result._id,  total: questions.length  });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};