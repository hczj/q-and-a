import React from 'react';
import { Link } from 'react-router-dom';

const FeedbackRow = ({ question, createdAt, rating }) => {
  const stars = new Array(rating).fill('');
  return (
    <tr>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
      <td>
        {stars.map((el, index) => <i key={index} className="fa fa-star" />)}
      </td>
      <th>
        <Link to={`/profile/${question.user.id}`}>
          {`${question.user.firstName} ${question.user.lastName}`}
        </Link>
      </th>
      <td>
        <Link to="/dashboard" className="button is-small is-primary">
          View
        </Link>
      </td>
    </tr>
  );
};

export default FeedbackRow;
