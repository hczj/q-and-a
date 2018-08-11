import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../store/';
import { ProfileCard, ProfileTopics } from '../../components';

class Profile extends React.Component {
  componentDidMount() {
    this.props.getUser(+this.props.match.params.id);
  }

  render() {
    if (!this.props.viewedUser.firstName) return null;
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
  viewedUser: state.users.active
});

export default connect(mapState, mapDispatch)(Profile);
