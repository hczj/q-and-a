import React from 'react';
import ProfileCard from './ProfileCard';
import ProfileTopics from './ProfileTopics';
import { useUser } from '../../hooks';

const Profile = props => {
  const user = useUser(+props.userId);
  if (!user.id) return null;
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
};

export default Profile;
