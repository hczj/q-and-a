import React, { Component } from 'react';
import { Navbar } from '../components';

const SiteHeader = () => (
  <header className="header">
    <Navbar />
    <div className="shapes">
      <span></span>
      <span></span>
    </div>
  </header>
);

export default SiteHeader;
