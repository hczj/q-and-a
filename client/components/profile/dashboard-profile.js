import React from 'react';

const DashboardProfile = ({ user }) => (
  <div className="box">
    <div className="content">
      <img src={user.imageUrl} />
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Location: {user.location}</p>
      <p>Bio: {user.bio}</p>
    </div>
    <div className="content">
      <img src={user.organization.imageUrl} />
      <p>Name: {user.organization.name}</p>
      <p>Location: {user.organization.location}</p>
      <p>Email: {user.organization.email}</p>
    </div>
  </div>
);

export default DashboardProfile;
