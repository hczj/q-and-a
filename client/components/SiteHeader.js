import React from 'react';
import Navbar from './Navbar';

const SiteHeader = props => {

  return (
    <header className="header">
      <Navbar {...props} />
      <div className="shapes">
        <span />
        <span />
      </div>
    </header>
  );
};

export default SiteHeader;
