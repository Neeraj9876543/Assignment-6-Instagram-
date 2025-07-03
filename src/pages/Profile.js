// frontend/src/pages/Profile.js
import React from 'react';
import { useParams } from 'react-router-dom';

function Profile() {
  const { username } = useParams();
  const allUsers = JSON.parse(localStorage.getItem('users')) || [];

  const user = username
    ? allUsers.find((u) => u.username === username)
    : JSON.parse(localStorage.getItem('token'));

  if (!user) {
    return <div className="container mt-4"><h4>User not found.</h4></div>;
  }

  return (
    <div className="container mt-4">
      <div className="card p-4 text-center">
        <img
          src={user.image || `https://i.pravatar.cc/150?u=${user.username}`}
          alt="profile"
          className="rounded-circle mb-3"
          width="100"
          height="100"
        />
        <h5>@{user.username}</h5>
        <p className="text-muted">{user.email || 'No email provided'}</p>
      </div>
    </div>
  );
}

export default Profile;
