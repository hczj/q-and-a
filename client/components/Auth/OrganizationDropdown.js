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

// import React, { Fragment, Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchOrganizations } from '../../store';

// class OrganizationDropdown extends Component {
//   componentDidMount() {
//     this.props.getOrganizations();
//   }

//   render() {
//     const { organizations } = this.props;
//     if (!organizations) return null;
//     return (
//       <Fragment>
//         <option>Please select...</option>
//         {organizations.map(organization => (
//           <option key={organization.id} value={+organization.id}>
//             {organization.name}
//           </option>
//         ))}
//       </Fragment>
//     );
//   }
// }

// const mapState = state => ({
//   organizations: state.organizations.all
// });

// const mapDispatch = dispatch => ({
//   getOrganizations: () => dispatch(fetchOrganizations())
// });

// export default connect(mapState, mapDispatch)(OrganizationDropdown);

