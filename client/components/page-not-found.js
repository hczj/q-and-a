import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Header} from '../components';

const PageNotFound = () => (
  <Fragment>
    <Header title="Page Not Found" />
    <div className="box">
      <h2 className="subtitle is-4">Sorry, we couldn't find that page.</h2>
      <p>Try returning to the <Link to="/">homepage</Link>.</p>
    </div>
  </Fragment>
)

export default PageNotFound;
