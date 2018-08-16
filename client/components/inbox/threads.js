import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Threads = ({ all }) => {
  console.log(all);
  return (
    <div className="box">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th />
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {all.map(elem => (
            <tr key={elem.id}>
              <Link to={`/inbox/thread/${elem.thread.id}`}>
                <th>{elem.user.firstName + ' ' + elem.user.lastName}</th>
                <td>{elem.thread.messages[0].content}</td>
                <td>{elem.thread.messages[0].createdAt}</td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapState = state => ({
  all: state.threads.all
});

export default connect(mapState)(Threads);
