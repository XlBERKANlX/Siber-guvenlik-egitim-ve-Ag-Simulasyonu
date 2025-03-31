import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Frame from './components/Frame';
import SiberTest from './components/SiberTest';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/flashcards" replace />} />
        <Route path="/flashcards" element={<Frame />} />
        <Route path="/siber-test" element={<SiberTest />} />
      </Routes>
    </Router>
  );
}

export default App;
