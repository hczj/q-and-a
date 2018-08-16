import React from 'react';
import { Link } from 'react-router-dom';

const Menu = props => (
  <div className="classroom-menu">
    <ul className="menu-list">
      <li>
        <Link to="/">
          <i className="fas fa-home" />
        </Link>
      </li>
      {/*<li>
        <a>
          <i className="fas fa-file-alt" />
        </a>
      </li>*/}
      <li>
        <a onClick={props.toggleEditor}>
          <i className="fas fa-code" />
        </a>
      </li>
      <li>
        <a onClick={props.toggleWhiteboard}>
          <i className="fas fa-pen" />
        </a>
      </li>
    </ul>
  </div>
);

export default Menu;
