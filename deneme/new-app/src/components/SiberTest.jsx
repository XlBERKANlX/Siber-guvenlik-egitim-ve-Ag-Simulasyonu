import React from 'react';
import { useNavigate } from 'react-router-dom';

const SiberTest = () => {
  const navigate = useNavigate();

  return (
    <div className="frame-container">
      <div className="sidebar">
        <div className="user-section">
          <svg className="user-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="user-text">User Account</span>
        </div>
        <div className="menu-items">
          <button className="menu-item active" onClick={() => navigate('/siber-test')}>
            <span className="menu-text">Siber Test</span>
          </button>
          <button className="menu-item" onClick={() => navigate('/flashcards')}>
            <span className="menu-text">Flashcards</span>
          </button>
          <button className="menu-item">
            <span className="menu-text">Simülasyon</span>
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="siber-test-container">
          <div className="question-container">
            <h2 className="question-title">Soru 1:</h2>
            <p className="question-text">denemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedenemedeneme</p>
            <div className="options-container">
              <button className="option-button">A) Kelime 1</button>
              <button className="option-button">B) Kelime 2</button>
              <button className="option-button">C) Kelime 3</button>
              <button className="option-button">D) Kelime 4</button>
            </div>
            <span className="frame-number">Frame 12</span>
          </div>
          <div className="navigation-buttons">
            <button className="nav-button previous">Önceki Soru</button>
            <button className="nav-button next">Sonraki Soru</button>
            <button className="nav-button finish">Testi Bitir</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiberTest; 