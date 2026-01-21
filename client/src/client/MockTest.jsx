import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';
import { useNavigate } from 'react-router-dom';

const MockTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { questionId: selectedIndex }
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const navigate = useNavigate();

  // 1. Fetch Questions on Load
  useEffect(() => {
    axios.get('http://localhost:5000/api/tests/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  // 2. Timer Logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmit(); // Auto submit when time is up
    }
  }, [timeLeft]);

  // 3. Format Time (MM:SS)
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleOptionSelect = (qId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const handleSubmit = async () => {
    // Transform answers object to array for backend
    const answerArray = Object.keys(answers).map(key => ({
        questionId: key,
        selectedOption: answers[key]
    }));

    try {
        const { data } = await axios.post('http://localhost:5000/api/tests/submit', {
            answers: answerArray,
            userId: "USER_ID_FROM_CONTEXT" // You will get this from AuthContext
        });
        navigate('/result', { state: data }); // Send result data to result page
    } catch (error) {
        alert("Submission Failed");
    }
  };

  if (questions.length === 0) return <div className="text-center mt-20">Loading Test...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Top Bar: Timer & Progress */}
      <div className="max-w-2xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mock Test 01</h1>
        <div className={`text-xl font-mono font-bold px-4 py-2 rounded-lg ${timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}>
        </div>
      </div>

      {/* Question Card */}
      <QuestionCard 
        question={questions[currentQ]} 
        selectedOption={answers[questions[currentQ]._id]}
        onOptionSelect={handleOptionSelect}
      />

      {/* Navigation Buttons */}
      <div className="max-w-2xl mx-auto mt-8 flex justify-between">
        <button 
          disabled={currentQ === 0}
          onClick={() => setCurrentQ(prev => prev - 1)}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        {currentQ === questions.length - 1 ? (
          <button 
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md"
          >
            Submit Test
          </button>
        ) : (
          <button 
            onClick={() => setCurrentQ(prev => prev + 1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default MockTest;