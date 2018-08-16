import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

const CommentCard = ({ createdAt, content, user, removeComment, myId, id }) => {
  return (
    <Fragment>
      <div className="box">
        <figure className="image is-48x48">
          <img className="is-rounded" src={user.imageUrl} />
        </figure>
        <Link to={`/profile/${user.id}`}>{`${user.firstName} ${
          user.lastName
        }`}</Link>
        <div>commented {moment(createdAt).fromNow()}</div>
        {content}
        {user.id === myId ? (
          <a className="button is-danger" onClick={() => removeComment(id)}>
            Delete
          </a>
        ) : (
          ''
        )}
      </div>
    </Fragment>
  );
};

const mapState = state => ({
  myId: state.me.id
});

export default connect(mapState)(CommentCard);
