import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const OrganizationDropdown = props => {
  const [organizations, setOrganizations] = useState([]);

  const fetchOrganizations = async () => {
    try {
      const { data } = await axios.get('/api/organizations');
      setOrganizations(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <Fragment>
      <option>{props.defaultOption}</option>
      {organizations.map(organization => (
        <option key={organization.id} value={+organization.id}>
          {organization.name}
        </option>
      ))}
    </Fragment>
  );
};

export default OrganizationDropdown;
