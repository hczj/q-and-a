import { useState, useEffect } from 'react';
import axios from 'axios';

function useUser(userId) {
  const [user, setUser] = useState({});

  const fetchUser = async id => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser(userId);
  }, []);

  return user;
}

export default useUser;
