// frontend/src/components/Post.js
import React, { useState } from 'react';

function Post() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('posts')) || []);

  const handlePost = (e) => {
    e.preventDefault();

    if (!caption || !image) return;

    const newPost = {
      caption,
      image,
      id: Date.now()
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setCaption('');
    setImage('');
  };

  return (
    <div className="card p-3">
      <form onSubmit={handlePost}>
        <textarea
          className="form-control mb-2"
          rows="2"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-100">Post</button>
      </form>

      <hr />
      {posts.map((post) => (
        <div key={post.id} className="mt-3">
          <img src={post.image} alt="post" className="img-fluid rounded mb-2" />
          <p>{post.caption}</p>
        </div>
      ))}
    </div>
  );
}

export default Post;
