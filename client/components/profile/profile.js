import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../store/';
import { ProfileCard, ProfileTopics } from '../../components';

class Profile extends React.Component {
  componentDidMount() {
    this.props.getUser(+this.props.match.params.id);
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) return null;
    return (
      <div className="columns is-centered">
        <ProfileCard className="column" />
        <ProfileTopics className="column" />
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  getUser: id => dispatch(fetchUser(id))
});

const mapState = state => ({
  viewedUser: state.users.active,
  isLoading: state.users.isLoading
});

export default connect(mapState, mapDispatch)(Profile);
