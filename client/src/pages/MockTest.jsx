import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MockTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Dynamic API URL (Works for Localhost AND Vercel)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // 1. Fetch Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/tests/questions`);
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // 2. Timer Logic
  useEffect(() => {
    if (timeLeft > 0 && !loading) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !loading) {
      handleSubmit(); // Auto-submit when time runs out
    }
  }, [timeLeft, loading]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${s % 60 < 10 ? '0' : ''}${s % 60}`;

  const handleOptionSelect = (idx) => {
    setAnswers({ ...answers, [questions[currentQ]._id]: idx });
  };

  const handleSubmit = async () => {
    const payload = Object.keys(answers).map(key => ({
      questionId: key,
      selectedOption: answers[key]
    }));

    try {
      const { data } = await axios.post(`${API_URL}/tests/submit`, { answers: payload });
      navigate('/result', { state: data });
    } catch (error) {
      alert('Error submitting test. Please try again.');
    }
  };

  // Loading State
  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          
          {/* Header: Timer & Count */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-dark mb-0">
              Question {currentQ + 1} <span className="text-muted fs-6">/ {questions.length}</span>
            </h4>
            <div className={`badge p-3 fs-5 rounded-pill shadow-sm ${timeLeft < 60 ? 'bg-danger' : 'bg-primary'}`}>
              ⏱ {formatTime(timeLeft)}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress mb-4 rounded-pill shadow-sm bg-white" style={{ height: '12px' }}>
            <div 
              className="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Card */}
          <div className="card shadow-lg p-4 mb-4 border-0 rounded-4">
            <div className="card-body">
              <span className="badge bg-light text-primary border border-primary mb-3 px-3 py-2 text-uppercase">
                {questions[currentQ].category || "General"}
              </span>
              <span className="badge bg-light text-secondary border border-secondary mb-3 ms-2 px-3 py-2 text-uppercase">
                {questions[currentQ].difficulty || "Medium"}
              </span>

              <h3 className="card-title fw-bold mb-4 mt-2 lh-base">{questions[currentQ].question}</h3>

              <div className="d-grid gap-3">
                {questions[currentQ].options.map((opt, idx) => {
                  const isSelected = answers[questions[currentQ]._id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      className={`btn btn-lg text-start p-3 border-2 rounded-3 transition-all ${
                        isSelected 
                          ? 'btn-primary shadow border-primary' 
                          : 'btn-outline-secondary border-light-subtle text-dark hover-shadow'
                      }`}
                      style={{ transition: '0.2s' }}
                    >
                      <span className={`fw-bold me-2 px-2 py-1 rounded ${isSelected ? 'bg-white text-primary' : 'bg-light text-dark'}`}>
                        {idx + 1}
                      </span> 
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between pt-2">
            <button 
              className="btn btn-outline-dark btn-lg px-4 rounded-pill" 
              disabled={currentQ === 0} 
              onClick={() => setCurrentQ(curr => curr - 1)}
            >
              ← Previous
            </button>
            
            {currentQ === questions.length - 1 ? (
              <button 
                className="btn btn-success btn-lg px-5 rounded-pill fw-bold shadow" 
                onClick={handleSubmit}
              >
                Submit Test ✅
              </button>
            ) : (
              <button 
                className="btn btn-primary btn-lg px-5 rounded-pill fw-bold shadow" 
                onClick={() => setCurrentQ(curr => curr + 1)}
              >
                Next →
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MockTest;