// frontend/src/components/Stories.js
import React from 'react';
import './Stories.css';

const stories = [
  { username: 'mike_92', img: 'https://i.pravatar.cc/150?u=mike' },
  { username: 'sara_lee', img: 'https://i.pravatar.cc/150?u=sara' },
  { username: 'tony.stark', img: 'https://i.pravatar.cc/150?u=tony' },
  { username: 'natasha', img: 'https://i.pravatar.cc/150?u=natasha' },
  { username: 'clarkkent', img: 'https://i.pravatar.cc/150?u=clark' },
  { username: 'bruce_wayne', img: 'https://i.pravatar.cc/150?u=bruce' }
];

function Stories() {
  return (
    <div className="stories-container">
      {stories.map((story, index) => (
        <div className="story text-center" key={index}>
          <img src={story.img} alt={story.username} />
          <small>{story.username}</small>
        </div>
      ))}
    </div>
  );
}

export default Stories;
