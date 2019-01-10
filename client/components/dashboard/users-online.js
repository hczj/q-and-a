import React from 'react';

const UsersOnline = ({ isTeacher }) => (
  <div className="tile is-child box">
    <p className="title">{`${isTeacher ? `4` : `2`}`}</p>
    <p className="subtitle">
      {`${isTeacher ? `Students` : `Teachers`} Online`}
    </p>
  </div>
);

export default UsersOnline;
