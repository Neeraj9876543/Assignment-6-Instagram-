import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Create from './pages/Create';
import Reels from './pages/Reels';
import Search from './pages/Search';
import Messages from './pages/Messages';

import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const isAuthenticated = localStorage.getItem('authUser');

  return (
    <Router>
      <div className="app-container d-flex">
        {/* Show sidebar only if user is logged in */}
        {isAuthenticated && <Sidebar />}

        <div className="main-content flex-grow-1">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/create" element={<Create />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/search" element={<Search />} />
            <Route path="/messages" element={<Messages />} />

            {/* Fallback Route */}
            <Route path="*" element={<h1 className="text-center mt-5">404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
