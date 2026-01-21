import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. Get data from state, or use empty object if null
  const data = location.state || {};

  // 2. Extract values with Fallbacks (0 if missing)
  const score = data.score || 0;
  const correct = data.correct || 0;
  const wrong = data.wrong || 0;
  
  // 3. SAFETY FIX: If 'total' is missing from backend, calculate it manually
  const total = data.total || (correct + wrong) || 0;
  
  // 4. Calculate Percentage
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  
  // 5. Theme Logic
  const isPass = percentage >= 50;
  const circleColor = isPass ? 'border-success text-success' : 'border-danger text-danger';

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-5">
      <div className="card shadow-lg border-0 p-4 text-center" style={{ maxWidth: '450px', width: '100%' }}>
        
        <h3 className="fw-bold text-dark mb-4">Quiz Summary</h3>
        
        {/* Score Circle */}
        <div 
          className={`rounded-circle mx-auto mb-4 border border-5 d-flex flex-column justify-content-center align-items-center ${circleColor}`} 
          style={{ width: '160px', height: '160px' }}
        >
          <h1 className="display-4 fw-bold mb-0">{percentage}%</h1>
          <span className="text-muted small fw-bold text-uppercase">Score</span>
        </div>

        {/* Stats Grid */}
        <div className="row g-2 mb-4">
          <div className="col-4">
            <div className="p-2 bg-success bg-opacity-10 border border-success border-opacity-25 rounded-3 h-100">
              <h3 className="text-success fw-bold mb-0">{correct}</h3>
              <small className="text-success fw-bold text-uppercase" style={{ fontSize: '0.75rem' }}>Correct</small>
            </div>
          </div>

          <div className="col-4">
            <div className="p-2 bg-danger bg-opacity-10 border border-danger border-opacity-25 rounded-3 h-100">
              <h3 className="text-danger fw-bold mb-0">{wrong}</h3>
              <small className="text-danger fw-bold text-uppercase" style={{ fontSize: '0.75rem' }}>Wrong</small>
            </div>
          </div>

          <div className="col-4">
            <div className="p-2 bg-light border border-secondary border-opacity-25 rounded-3 h-100">
              {/* Display safeTotal here */}
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