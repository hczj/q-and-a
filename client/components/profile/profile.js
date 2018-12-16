import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../store/';
import { ProfileCard, ProfileTopics } from '../../components';

class Profile extends React.Component {
  componentDidMount() {
    this.props.getUser(+this.props.match.params.id);
  }

  render() {
    const { isLoading, user } = this.props;
    if (isLoading) return null;
    return (
      <div className="columns is-centered">
        <div className="column is-6 is-4-desktop is-3-fullhd">
          <ProfileCard user={user} />
        </div>
        <div className="column">
          {user.topics && <ProfileTopics topics={user.topics} />}
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  getUser: id => dispatch(fetchUser(id))
});

const mapState = state => ({
  isLoading: state.users.isLoading,
  user: state.users.active
});

export default connect(mapState, mapDispatch)(Profile);
