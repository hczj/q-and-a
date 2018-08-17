import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../../components';

const Threads = ({ threads, handleClick }) => (
  <Fragment>
    <Header title="Inbox" />
    <div className="box">
      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {threads.map(elem => {
            const { thread, user } = elem;
            return (
              <tr key={thread.id} onClick={evt => handleClick(evt, thread.id)}>
                <th>{user.firstName + ' ' + user.lastName}</th>
                <td>
                  {thread.messages[thread.messages.length - 1] &&
                    thread.messages[thread.messages.length - 1].content}
                </td>
                <td>
                  {thread.messages &&
                    new Date(
                      thread.messages[thread.messages.length - 1].createdAt
                    ).toLocaleDateString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </Fragment>
);

export default Threads;
