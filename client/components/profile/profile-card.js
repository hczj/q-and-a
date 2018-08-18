import React from 'react';

export default ({ user }) => (
  <div className="card">
    <div className="card-image">
      <figure className="image is-4by3">
        <img src={user.imageUrl} />
      </figure>
    </div>
    <div className="card-content">
      <p className="title is-4">
        {user.isActive ? '✅' : '⛔'} {user.firstName} {user.lastName}
      </p>
      {user.location && <p className="subtitle is-6">{user.location}</p>}
      {user.bio && <p>{user.bio}</p>}
    </div>
  </div>
);
