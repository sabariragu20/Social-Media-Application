import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePost from './pages/CreatePost';
import Sidebar from './components/Sidebar';
import LikedPage from './pages/LikedPage';
import SavedPage from './pages/SavedPage';
import './index.css'; // Import CSS file for styling

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/liked" element={<LikedPage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/saved-page" element={<SavedPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
