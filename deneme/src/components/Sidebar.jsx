"use client";
import React from "react";
import UserProfile from "./UserProfile";
import NavigationMenu from "./NavigationMenu";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <span className="sidebar-text">Siber Test</span>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-text">Flashcards</span>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-text">Simülasyon</span>
      </div>
    </div>
  );
};

export default Sidebar;
