import React, { Fragment } from 'react';

const Threads = ({ threads, handleClick }) => {
  return (
    <Fragment>
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
                <tr
                  key={thread.id}
                  onClick={evt => handleClick(evt, thread.id)}
                >
                  <th>{user.firstName + ' ' + user.lastName}</th>
                  <td>
                    {thread.messages[thread.messages.length - 1] &&
                      thread.messages[thread.messages.length - 1].content}
                  </td>
                  <td>
                    {thread.messages.length > 0 &&
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
};

export default Threads;
