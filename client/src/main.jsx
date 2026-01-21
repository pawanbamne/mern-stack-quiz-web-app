import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Add this line to import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css' // We will add a little custom CSS here

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)