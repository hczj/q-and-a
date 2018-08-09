import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div>
    <h1>Sorry, we couldn't find that page.</h1>
    <p>Try returning to the <Link to="/">homepage</Link>.</p>
  </div>
)
