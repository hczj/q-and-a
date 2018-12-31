import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

export const MeContext = React.createContext();

export const MeProvider = props => {
  const [me, setMe] = useState({});

  const fetchMe = async () => {
    try {
      const { data } = await axios.get('/auth/me');
      setMe(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const authorize = async (formData, method) => {
    const {
      firstName,
      lastName,
      email,
      password,
      organizationId,
      isTeacher
    } = formData;

    try {
      const { data } = await axios.post(
        `/auth/${method}`,
        method === 'login'
          ? {
              email,
              password
            }
          : {
              firstName,
              lastName,
              email,
              password,
              organizationId,
              isTeacher
            }
      );
      setMe(data);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      setMe({});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MeContext.Provider value={{ me, authorize, logout }}>
      {props.children}
    </MeContext.Provider>
  );
};
