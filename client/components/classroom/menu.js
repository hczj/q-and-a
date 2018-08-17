import React from 'react';
import { Link } from 'react-router-dom';

const Menu = props => (
  <div className="classroom-menu">
    <ul className="menu-list">
      <li>
        <a>
          <i className="fas fa-file-alt" />
        </a>
      </li>
      <li>
        <a onClick={() => props.toggleEditor(true)}>
          <i className="fas fa-code" />
        </a>
      </li>
      <li>
        <a onClick={() => props.toggleWhiteboard(true)}>
          <i className="fas fa-pen" />
        </a>
      </li>
    </ul>
  </div>
);

export default Menu;
