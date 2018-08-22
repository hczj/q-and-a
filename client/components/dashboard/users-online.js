import React from 'react';

const UsersOnline = ({ isTeacher }) => (
  <div className="tile is-parent">
    <article className="tile is-child box">
      <p className="title">{`${isTeacher ? `8` : `5`}`}</p>
      <p className="subtitle">
        {`${isTeacher ? `Students` : `Teachers`} Online`}
      </p>
    </article>
  </div>
);

export default UsersOnline;
