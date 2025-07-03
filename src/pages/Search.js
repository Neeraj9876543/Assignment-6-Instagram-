import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3 className="mb-3">🔍 Search Users</h3>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm ? (
        filteredUsers.length > 0 ? (
          <ul className="list-group">
            {filteredUsers.map((user, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                @{user.username}
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => navigate(`/profile/${user.username}`)}
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No matching users found.</p>
        )
      ) : null}
    </div>
  );
}

export default Search;
