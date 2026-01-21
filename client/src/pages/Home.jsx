// client/src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg border-0 p-5 text-center" style={{ maxWidth: '700px' }}>
        <div className="card-body">
          <h1 className="display-3 fw-bold text-primary mb-3">MERN Mock Test</h1>
          <p className="lead text-muted mb-5">
            Evaluate your knowledge with our industry-standard platform. 
            Timed MCQs with instant result analytics.
          </p>

          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="p-3 bg-white shadow-sm rounded border">
                <h2 className="mb-2">⚡</h2>
                <h6 className="fw-bold mb-0">Fast</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-white shadow-sm rounded border">
                <h2 className="mb-2">🧩</h2>
                <h6 className="fw-bold mb-0">Random</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-white shadow-sm rounded border">
                <h2 className="mb-2">📊</h2>
                <h6 className="fw-bold mb-0">Analytics</h6>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/test')}
            className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold shadow"
          >
            Start Quiz 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;