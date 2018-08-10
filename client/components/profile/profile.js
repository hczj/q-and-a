import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../store/';
import ProfileCard from './profile-card';
import CurrentTopics from './current-topics';

class Profile extends React.Component {
  componentDidMount() {
    this.props.getUser(+this.props.match.params.id);
  }

  render() {
    if (!this.props.viewedUser.firstName) {
      return <React.Fragment />;
    } else {
      return (
        <div className="columns is-centered">
          <ProfileCard className="column" />
          <CurrentTopics className="column" />
        </div>
      );
    }
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: id => dispatch(fetchUser(id))
  };
};

const mapState = state => {
  return {
    viewedUser: state.users.active
  };
};

export default connect(mapState, mapDispatch)(Profile);
