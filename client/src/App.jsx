import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MockTest from './pages/MockTest';
import Result from './pages/Result';

function App() {
  return (
    <Router>
      <div className="bg-light min-vh-100"> {/* Bootstrap utility for full height */}
        <div className="container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<MockTest />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;