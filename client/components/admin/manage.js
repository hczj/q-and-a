import React, { useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import { MeContext } from '../../context';
import { Header } from '../../components';

const initialState = {
  users: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_USERS':
      return {
        ...state,
        users: action.users
      };

    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.userId)
      };

    default:
      return state;
  }
};

const Manage = () => {
  const { me } = useContext(MeContext);

  const [{ users }, dispatch] = useReducer(reducer, initialState);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/users');
      dispatch({
        type: 'RECEIVE_USERS',
        users: data
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (event, user) => {
    event.preventDefault();

    if (user.id === me.id) {
      if (confirm('You are about to delete yourself! Are you sure?')) {
        await axios.delete(`/api/users/${user.id}`);
      }
    } else {
      await axios.delete(`/api/users/${user.id}`);
    }

    dispatch({
      type: 'DELETE_USER',
      userId: user.id
    });
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

export default Manage;
