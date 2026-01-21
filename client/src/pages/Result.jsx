import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. Safe Data Extraction (Prevents crash if accessed directly)
  const data = location.state || {};
  const score = data.score || 0;
  const correct = data.correct || 0;
  const wrong = data.wrong || 0;
  
  // 2. Safety Logic for Total: If backend sends 0 or null, calculate it locally
  const total = data.total || (correct + wrong) || 0;
  
  // 3. Calculate Percentage
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  
  // 4. Pass/Fail Theme Logic
  const isPass = percentage >= 50;
  const themeColor = isPass ? 'success' : 'danger';

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-5">
      <div className="card shadow-lg border-0 p-4 text-center rounded-4" style={{ maxWidth: '450px', width: '100%' }}>
        
        <h3 className="fw-bold text-dark mb-4">Quiz Summary</h3>
        
        {/* Score Circle */}
        <div 
          className={`rounded-circle mx-auto mb-4 border border-5 d-flex flex-column justify-content-center align-items-center border-${themeColor} text-${themeColor}`} 
          style={{ width: '160px', height: '160px' }}
        >
          <h1 className="display-3 fw-bold mb-0">{percentage}%</h1>
          <span className="text-secondary small fw-bold text-uppercase">Score</span>
        </div>

        {/* Message */}
        <h4 className={`fw-bold mb-4 text-${themeColor}`}>
            {isPass ? "Great Job! 🎉" : "Keep Practicing! 💪"}
        </h4>

        {/* Stats Grid */}
        <div className="row g-2 mb-4">
          
          {/* Correct */}
          <div className="col-4">
            <div className="p-2 bg-success bg-opacity-10 border border-success border-opacity-25 rounded-3 h-100">
              <h3 className="text-success fw-bold mb-0">{correct}</h3>
              <small className="text-success fw-bold text-uppercase" style={{ fontSize: '0.75rem' }}>Correct</small>
            </div>
          </div>

          {/* Wrong */}
          <div className="col-4">
            <div className="p-2 bg-danger bg-opacity-10 border border-danger border-opacity-25 rounded-3 h-100">
              <h3 className="text-danger fw-bold mb-0">{wrong}</h3>
              <small className="text-danger fw-bold text-uppercase" style={{ fontSize: '0.75rem' }}>Wrong</small>
            </div>
          </div>

          {/* Total */}
          <div className="col-4">
            <div className="p-2 bg-light border border-secondary border-opacity-25 rounded-3 h-100">
              <h3 className="text-dark fw-bold mb-0">{total}</h3>
              <small className="text-dark fw-bold text-uppercase" style={{ fontSize: '0.75rem' }}>Total</small>
            </div>
          </div>

        </div>

        <button 
          onClick={() => navigate('/')} 
          className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Result;