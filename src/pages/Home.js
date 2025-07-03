import React, { useEffect, useState } from 'react';
import Stories from '../components/Stories';
import Suggest from '../components/Suggest';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(stored);
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Section: Stories + Posts */}
        <div className="col-lg-8">
          <Stories />

          <h3 className="mt-4">📸 Recent Posts</h3>
          {posts.length === 0 && <p className="text-muted">No posts yet.</p>}

          {posts.map((post) => (
            <div key={post.id} className="card mb-3">
              {post.mediaURL && (
                <img src={post.mediaURL} className="card-img-top" alt="post" />
              )}
              <div className="card-body">
                <h5 className="card-title">@{post.user}</h5>
                <p className="card-text">{post.caption}</p>
                <small className="text-muted">
                  {new Date(post.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section: Suggestions */}
        <div className="col-lg-4 d-none d-lg-block">
          <Suggest />
        </div>
      </div>
    </div>
  );
}

export default Home;
