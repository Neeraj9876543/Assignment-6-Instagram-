import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axiosInstance';
import { showError } from '../components/SweetComponent';

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (username) {
          const response = await API.get(`/users/?username=${username}`);
          setUser(response.data[0]);
        } else {
          const response = await API.get('/auth/users/me/');
          setUser(response.data);
        }
      } catch (error) {
        console.error(error);
        showError('Error', 'Failed to fetch user profile');
      }
    };

    fetchProfile();
  }, [username]);

  if (!user) {
    return <div className="container mt-4"><h4>Loading profile...</h4></div>;
  }

  return (
    <div className="container mt-4">
      <div className="card p-4 text-center">
        <img src={`https://i.pravatar.cc/150?u=${user.username}`} alt="profile" className="rounded-circle mb-3" width="100" height="100" />
        <h5>@{user.username}</h5>
        <p className="text-muted">{user.email || 'No email provided'}</p>
      </div>
    </div>
  );
}

export default Profile;