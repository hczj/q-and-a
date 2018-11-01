import React from 'react';

const Header = ({ title, size }) => (
  <h1 className={`title ${size ? size : 'is-1'}`}>{title}</h1>
);

export default Header;
