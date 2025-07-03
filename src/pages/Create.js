import React, { useState } from 'react';

function Create() {
  const [activeTab, setActiveTab] = useState('post');
  const [caption, setCaption] = useState('');
  const [mediaURL, setMediaURL] = useState('');

  const handleCreate = () => {
    const newItem = {
      id: Date.now(),
      type: activeTab,
      caption,
      mediaURL,
      createdAt: new Date().toISOString(),
      user: JSON.parse(localStorage.getItem('authUser'))?.username || 'Guest'
    };

    const storageKey = activeTab === 'post' ? 'posts' : 'reels';
    const existing = JSON.parse(localStorage.getItem(storageKey)) || [];
    existing.unshift(newItem); // newest first
    localStorage.setItem(storageKey, JSON.stringify(existing));

    // Reset fields
    setCaption('');
    setMediaURL('');
    alert(`${activeTab === 'post' ? 'Post' : 'Reel'} created successfully!`);
  };

  return (
    <div className="container mt-4">
      <h3>Create {activeTab === 'post' ? 'Post' : 'Reel'}</h3>

      <div className="btn-group my-3">
        <button
          className={`btn btn-${activeTab === 'post' ? 'primary' : 'outline-primary'}`}
          onClick={() => setActiveTab('post')}
        >
          Post
        </button>
        <button
          className={`btn btn-${activeTab === 'reel' ? 'primary' : 'outline-primary'}`}
          onClick={() => setActiveTab('reel')}
        >
          Reel
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Caption</label>
        <input
          type="text"
          className="form-control"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">{activeTab === 'post' ? 'Image/Media URL' : 'Reel Video URL'}</label>
        <input
          type="text"
          className="form-control"
          value={mediaURL}
          onChange={(e) => setMediaURL(e.target.value)}
        />
      </div>

      <button className="btn btn-success" onClick={handleCreate}>
        Create {activeTab === 'post' ? 'Post' : 'Reel'}
      </button>
    </div>
  );
}

export default Create;
