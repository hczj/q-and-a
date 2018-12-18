import { useState, useEffect } from 'react';
import axios from 'axios';

function useMe() {
  const [me, setMe] = useState({});

  const fetchMe = async () => {
    try {
      const { data } = await axios.get('/auth/me');
      setMe(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchMe();
  }, []);

  return me;
}

export default useMe;
