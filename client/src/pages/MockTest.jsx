// client/src/pages/MockTest.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MockTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/tests/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${s % 60 < 10 ? '0' : ''}${s % 60}`;

  const handleOptionSelect = (idx) => {
    setAnswers({ ...answers, [questions[currentQ]._id]: idx });
  };

  const handleSubmit = async () => {
    const payload = Object.keys(answers).map(key => ({
      questionId: key,
      selectedOption: answers[key]
    }));
    const { data } = await axios.post('http://localhost:5000/api/tests/submit', { answers: payload });
    navigate('/result', { state: data });
  };

  if (!questions.length) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold text-dark mb-0">Question {currentQ + 1} of {questions.length}</h3>
            <div className={`badge p-3 fs-5 rounded-pill shadow-sm ${timeLeft < 60 ? 'bg-danger' : 'bg-primary'}`}>
              ⏱ {formatTime(timeLeft)}
            </div>
          </div>

          <div className="progress mb-4 rounded-pill shadow-sm" style={{ height: '12px' }}>
            <div 
              className="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          <div className="card shadow-lg p-4 mb-4 border-0">
            <div className="card-body">
              <span className="badge bg-soft-primary text-primary border border-primary mb-3 px-3 py-2 uppercase">
                {questions[currentQ].category || "General"}
              </span>
              <h2 className="card-title fw-bold mb-5 mt-2">{questions[currentQ].question}</h2>

              <div className="row g-3">
                {questions[currentQ].options.map((opt, idx) => {
                  const isSelected = answers[questions[currentQ]._id] === idx;
                  return (
                    <div className="col-12" key={idx}>
                      <button
                        onClick={() => handleOptionSelect(idx)}
                        className={`btn btn-lg w-100 text-start p-4 border-2 rounded-4 ${
                          isSelected ? 'btn-primary shadow' : 'btn-outline-secondary'
                        }`}
                      >
                        <span className="me-3 fw-bold">{idx + 1}.</span> {opt}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between pt-3">
            <button 
              className="btn btn-outline-dark btn-lg px-4 rounded-pill" 
              disabled={currentQ === 0} 
              onClick={() => setCurrentQ(curr => curr - 1)}
            >
              ← Previous
            </button>
            
            {currentQ === questions.length - 1 ? (
              <button className="btn btn-success btn-lg px-5 rounded-pill fw-bold shadow" onClick={handleSubmit}>
                Submit Final ✅
              </button>
            ) : (
              <button className="btn btn-primary btn-lg px-5 rounded-pill fw-bold shadow" onClick={() => setCurrentQ(curr => curr + 1)}>
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