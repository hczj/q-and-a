import React from 'react';

const Main = ({ user }) => (
  <div className="box">
    <div className="content">
      <p>{`Welcome, ${user.firstName}!`}</p>
    </div>
  </div>
);

export default Main;
