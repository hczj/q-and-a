import React, { Component } from 'react';
import { Navbar } from '../components';

const SiteHeader = ({ bgColor }) => (
  <header className="header">
    <Navbar bgColor={bgColor} />
    <div className="shapes">
      <span />
      <span />
    </div>
  </header>
);

export default SiteHeader;
