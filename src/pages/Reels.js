import React, { useEffect, useState } from 'react';

function Reels() {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    const storedReels = JSON.parse(localStorage.getItem('reels')) || [];
    setReels(storedReels);
  }, []);

  return (
    <div className="container mt-4">
      <h3>🎞️ Reels</h3>

      {reels.length === 0 && (
        <p className="text-muted">No reels available. Add some videos!</p>
      )}

      <div className="d-flex flex-column align-items-center">
        {reels.map((reel) => (
          <div key={reel.id} className="card mb-4 w-100" style={{ maxWidth: '500px' }}>
            <video
              src={reel.videoURL}
              controls
              className="w-100"
              style={{ borderRadius: '8px' }}
            />
            <div className="card-body">
              <h5 className="card-title">@{reel.username}</h5>
              <p className="card-text">{reel.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reels;
