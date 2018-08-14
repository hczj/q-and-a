import React from 'react';
import { Link } from 'react-router-dom';

const Menu = props => (
  <div className="classroom-menu">
    <ul className="menu-list">
      <li><Link to="/"><i className="fas fa-home"></i></Link></li>
      <li><a><i className="fas fa-file-alt"></i></a></li>
      <li><a><i className="fas fa-code"></i></a></li>
      <li><a><i className="fas fa-pen"></i></a></li>
    </ul>
  </div>
)

export default Menu;
