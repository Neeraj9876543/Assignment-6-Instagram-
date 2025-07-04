// frontend/src/pages/Create.js
import React, { useState } from 'react';
import API from '../api/axiosInstance';
import { showSuccess, showError } from '../components/SweetComponent';

function Create() {
  const [activeTab, setActiveTab] = useState('post');
  const [caption, setCaption] = useState('');
  const [mediaURL, setMediaURL] = useState('');

  const handleCreate = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      showError('Not Logged In', 'Please login to create a post or reel.');
      return;
    }

    if (!caption.trim() || !mediaURL.trim()) {
      showError('Missing Fields', 'Both caption and media URL are required.');
      return;
    }

    try {
      const endpoint = activeTab === 'post' ? '/posts/' : '/reels/';
      const payload = {
        caption,
        media_url: mediaURL,
      };

      await API.post(endpoint, payload); // token is already applied globally in axiosInstance
      showSuccess(`${activeTab === 'post' ? 'Post' : 'Reel'} created successfully!`);

      // Clear fields
      setCaption('');
      setMediaURL('');
    } catch (err) {
      console.error('Creation Error:', err?.response?.data || err.message);
      const msg =
        err?.response?.data?.media_url?.[0] ||
        err?.response?.data?.caption?.[0] ||
        err?.response?.data?.detail ||
        'Failed to create item. Make sure you are logged in and all fields are valid.';
      showError('Error', msg);
    }
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
          placeholder="Enter caption"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          {activeTab === 'post' ? 'Image URL' : 'Reel Video URL'}
        </label>
        <input
          type="text"
          className="form-control"
          value={mediaURL}
          onChange={(e) => setMediaURL(e.target.value)}
          placeholder="https://..."
          required
        />
      </div>

      <button className="btn btn-success" onClick={handleCreate}>
        Create {activeTab === 'post' ? 'Post' : 'Reel'}
      </button>
    </div>
  );
}

export default Create;
