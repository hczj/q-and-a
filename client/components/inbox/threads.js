import React, { Fragment } from 'react';

const Threads = ({ threads, handleClick }) => {
  return (
    <Fragment>
      <div className="">
        <table className="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {threads.map(thread => {
              return (
                <tr key={thread.id} onClick={() => handleClick(thread)}>
                  <td>{`${thread.sender.name}`}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
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
