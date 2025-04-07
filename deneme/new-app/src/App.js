import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Frame from './components/Frame';
import SiberTest from './components/SiberTest';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flashcards" element={<Frame />} />
        <Route path="/siber-test" element={<SiberTest />} />
      </Routes>
    </Router>
  );
}

export default App;
