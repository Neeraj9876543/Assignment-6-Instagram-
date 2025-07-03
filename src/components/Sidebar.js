// frontend/src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [user, setUser] = useState({ username: '', image: '' });

  useEffect(() => {
    const authUser = localStorage.getItem('authUser');
    if (authUser) {
      try {
        const parsedUser = JSON.parse(authUser);
        setUser({
          username: parsedUser.username || 'User',
          image: parsedUser.image || `https://i.pravatar.cc/150?u=${parsedUser.username}`,
        });
      } catch {
        setUser({ username: 'User', image: 'https://i.pravatar.cc/150?u=guest' });
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    window.location.href = '/login';
  };

  return (
    <div className="bg-light p-3 min-vh-100 border-end" style={{ width: '220px' }}>
      <div className="d-flex align-items-center mb-4">
        <img
          src={user.image}
          alt="Profile"
          className="rounded-circle me-2"
          width="40"
          height="40"
        />
        <div>
          <strong>@{user.username}</strong>
        </div>
      </div>

      <nav className="nav flex-column gap-2">
        <Link to="/" className="nav-link text-dark">🏠 Home</Link>
        <Link to="/search" className="nav-link text-dark">🔍 Search</Link>
        <Link to="/reels" className="nav-link text-dark">🎞️ Reels</Link>
        <Link to="/create" className="nav-link text-dark">➕ Create</Link>
        <Link to="/messages" className="nav-link text-dark">💬 Messages</Link>
        <Link to="/profile" className="nav-link text-dark">👤 Profile</Link>
        <button onClick={handleLogout} className="btn btn-outline-danger mt-3">🚪 Logout</button>
      </nav>
    </div>
  );
}

export default Sidebar;
