import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';

function Reels() {
  const [reels, setReels] = useState([]);
  const [caption, setCaption] = useState('');
  const [videoURL, setVideoURL] = useState('');

  const fetchReels = async () => {
    try {
      const res = await API.get('/api/reels/');
      setReels(res.data);
    } catch (err) {
      console.error('Failed to load reels:', err);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  const handleAddReel = async () => {
    if (!caption || !videoURL) return;

    try {
      await API.post('/api/reels/', {
        caption: caption,
        video_url: videoURL,
      });

      setCaption('');
      setVideoURL('');
      fetchReels(); // Refresh the list
    } catch (err) {
      console.error('Failed to add reel:', err.response?.data);
    }
  };

  return (
    <div className="container mt-4">
      <h3>🎞️ Reels</h3>

      <div className="card p-3 mb-4" style={{ maxWidth: '500px', margin: 'auto' }}>
        <input
          type="text"
          placeholder="Video URL"
          className="form-control mb-2"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
        />
        <input
          type="text"
          placeholder="Caption"
          className="form-control mb-2"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={handleAddReel}>
          Upload Reel
        </button>
      </div>

      {reels.length === 0 && (
        <p className="text-muted text-center">No reels available. Add some videos!</p>
      )}

      <div className="d-flex flex-column align-items-center">
        {reels.map((reel) => (
          <div key={reel.id} className="card mb-4 w-100" style={{ maxWidth: '500px' }}>
            <video
              src={reel.video_url}
              controls
              className="w-100"
              style={{ borderRadius: '8px', height: '400px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">@{reel.user}</h5>
              <p className="card-text">{reel.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reels;
