import React from 'react';

const Main = ({ user }) => (
  <div className="container">
    <section className="hero is-dark welcome is-small">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Hello, {user.firstName}.</h1>
          <h2 className="subtitle">I hope you are having a great day!</h2>
        </div>
      </div>
    </section>
    <section className="info-tiles">
      <div className="tile is-ancestor has-text-centered">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">4</p>
            <p className="subtitle">Teachers Online</p>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">8</p>
            <p className="subtitle">Questions In Queue</p>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">2</p>
            <p className="subtitle">Active Questions</p>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title">3</p>
            <p className="subtitle">Topics Currently Learning</p>
          </article>
        </div>
      </div>
    </section>
    <div className="columns">
      <div className="column is-6">
        <div className="card events-card">
          <header className="card-header">
            <p className="card-header-title">Questions</p>
            <a href="#" className="card-header-icon" aria-label="more options">
              <span className="icon">
                <i className="fa fa-angle-down" aria-hidden="true" />
              </span>
            </a>
          </header>
          <div className="card-table">
            <div className="content">
              <table className="table is-fullwidth is-striped">
                <tbody>
                  <tr>
                    <td width="5%">
                      <i className="fa fa-circle" />
                    </td>
                    <td>What is happening in my life???</td>
                    <td>
                      <a className="button is-small is-primary" href="#">
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td width="5%">
                      <i className="fa fa-circle" />
                    </td>
                    <td>So confused...</td>
                    <td>
                      <a className="button is-small is-primary" href="#">
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td width="5%">
                      <i className="fa fa-circle" />
                    </td>
                    <td>Help help help</td>
                    <td>
                      <a className="button is-small is-primary" href="#">
                        View
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <footer className="card-footer">
            <a href="#" className="card-footer-item">
              View All
            </a>
          </footer>
        </div>
      </div>
      <div className="column is-6">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Question Search</p>
            <a href="#" className="card-header-icon" aria-label="more options">
              <span className="icon">
                <i className="fa fa-angle-down" aria-hidden="true" />
              </span>
            </a>
          </header>
          <div className="card-content">
            <div className="content">
              <div className="control has-icons-left has-icons-right">
                <input className="input is-large" type="text" placeholder="" />
                <span className="icon is-medium is-left">
                  <i className="fa fa-search" />
                </span>
                <span className="icon is-medium is-right">
                  <i className="fa fa-check" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Teacher Search</p>
            <a href="#" className="card-header-icon" aria-label="more options">
              <span className="icon">
                <i className="fa fa-angle-down" aria-hidden="true" />
              </span>
            </a>
          </header>
          <div className="card-content">
            <div className="content">
              <div className="control has-icons-left has-icons-right">
                <input className="input is-large" type="text" placeholder="" />
                <span className="icon is-medium is-left">
                  <i className="fa fa-search" />
                </span>
                <span className="icon is-medium is-right">
                  <i className="fa fa-check" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Main;
