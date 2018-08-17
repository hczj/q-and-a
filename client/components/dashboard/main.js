import React from 'react';

const Main = ({ user, isTeacher }) => (
  <div className="box">
    <div className="content">
      <p>
        {`Welcome, ${user.firstName}! You are currently a ${
          isTeacher ? 'teacher' : 'student'
        } at ${user.organization.name}.`}
      </p>
    </div>
  </div>
);

export default Main;
