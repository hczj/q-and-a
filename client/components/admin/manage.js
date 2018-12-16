import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Header } from '../../components';

const Manage = props => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/users');
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (event, user) => {
    event.preventDefault();

    if (user.id === props.myId) {
      if (confirm('You are about to delete yourself! Are you sure?')) {
        await axios.delete(`/api/users/${user.id}`);
      }
    } else {
      await axios.delete(`/api/users/${user.id}`);
    }

    fetchUsers();
  };

  return (
    <div>
      <Header title="Manage" />
      <h2 className="subtitle is-3">Users</h2>
      <table className="table is-fullwidth is-striped">
        <colgroup>
          <col style={{ width: '8%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Joined</th>
            <th scope="col">Role</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>{user.isAdmin ? 'Admin' : 'Customer'}</td>
              <td>
                <a
                  href="#"
                  onClick={event => handleDelete(event, user)}
                  className="button is-danger is-small"
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapState = state => ({
  isAdmin: !!state.me.isAdmin,
  myId: state.me.id
});

export default connect(mapState)(Manage);
