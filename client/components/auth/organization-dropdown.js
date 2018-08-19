import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrganizations } from '../../store';

class OrganizationDropdown extends Component {
  componentDidMount() {
    this.props.getOrganizations();
  }

  render() {
    const { organizations } = this.props;
    if (!organizations) return null;
    return (
      <Fragment>
        <option>Select organization</option>
        {organizations.map(organization => (
          <option key={organization.id} value={+organization.id}>
            {organization.name}
          </option>
        ))}
      </Fragment>
    );
  }
}

const mapState = state => ({
  organizations: state.organizations.all
});

const mapDispatch = dispatch => ({
  getOrganizations: () => dispatch(fetchOrganizations())
});

export default connect(mapState, mapDispatch)(OrganizationDropdown);
