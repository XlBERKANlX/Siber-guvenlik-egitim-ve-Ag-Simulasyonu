import React from 'react';
import { useNavigate } from 'react-router-dom';

const Frame = () => {
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
          <button className="menu-item" onClick={() => navigate('/siber-test')}>
            <span className="menu-text">Siber Test</span>
          </button>
          <button className="menu-item active">
            <span className="menu-text">Flashcards</span>
          </button>
          <button className="menu-item">
            <span className="menu-text">Simülasyon</span>
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="content-area">
          <h1 className="content-title">FlashCards</h1>
          <div className="flash-cards-container">
            <div className="flash-card">
              <span className="flash-card-text">Bilgi Verilen kelime</span>
            </div>
            <div className="flash-card">
              <span className="flash-card-text">Kelime Bilgisi/Bilgileri</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frame; 