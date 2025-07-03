// frontend/src/components/Suggest.js
import React, { useEffect, useState } from 'react';

function Suggest() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const demoUsers = [
      { username: 'emma23' },
      { username: 'mike_92' },
      { username: 'sara_lee' }
    ];
    setUsers(demoUsers);
  }, []);

  return (
    <div className="card p-3">
      <h6 className="mb-3">Suggestions for you</h6>
      <ul className="list-group list-group-flush">
        {users.map((user, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {user.username}
            <button className="btn btn-sm btn-outline-primary">Follow</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suggest;
