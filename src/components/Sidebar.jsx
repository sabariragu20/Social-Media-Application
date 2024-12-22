import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track if the sidebar is open
  const navigate = useNavigate();

  console.log("Sidebar state:", isOpen);


  const handleToggle = () => {
    setIsOpen(!isOpen); // Toggle the sidebar visibility
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close the sidebar after navigating
  };

  return (
    <div>
      {/* Toggle Button */}
      {!isOpen && (
        <button id="toggle-btn" onClick={handleToggle}> <div>☰</div>
        </button>
      )}

      {/* Sidebar */}
      <div className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
        {/* Close Button */}
        {isOpen && (
          <button className="close-btn" onClick={handleToggle}>
            x
          </button>
        )}

        <ul className="sidebar-menu">
          <li className="sidebar-item" id="sidebar-item-snapgram">
            SNAPGRAM
          </li>
          <li className="sidebar-item" onClick={() => handleNavigation('/')}>
            Home
          </li>
          <li className="sidebar-item" onClick={() => handleNavigation('/liked')}>
            Liked Posts
          </li>
          <li className="sidebar-item" onClick={() => handleNavigation('/saved-page')}>
            Saved
          </li>
          <button className="sidebar-btn" onClick={() => handleNavigation('/create-post')}>
            Create Post
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
