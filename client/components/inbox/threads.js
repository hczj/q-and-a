import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../../components';

const Threads = ({ threads }) => (
  <Fragment>
    <Header title="Inbox" />
    <div className="box">
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {threads.map(elem => (
            <tr key={elem.thread.id}>
              <th>
                <Link to={`/inbox/thread/${elem.thread.id}`}>
                  {elem.user.firstName + ' ' + elem.user.lastName}
                </Link>
              </th>
              <td>{elem.thread.messages[0].content}</td>
              <td>
                {new Date(
                  elem.thread.messages[0].createdAt
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Fragment>
);

export default Threads;
