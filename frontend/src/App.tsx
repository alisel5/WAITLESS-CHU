import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages (your teammate will create these)
import Home from './pages/Home';
import Queue from './pages/Queue';
import Ticket from './pages/Ticket';
import Staff from './pages/Staff';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/queue/:departmentId" element={<Queue />} />
          <Route path="/ticket/:ticketId" element={<Ticket />} />
          <Route path="/staff/:departmentId" element={<Staff />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 