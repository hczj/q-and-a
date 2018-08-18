import React from 'react';
import { Link } from 'react-router-dom';

const FeedbackTable = ({ feedback }) => (
  <table className="table is-fullwidth is-hoverable">
    <thead>
      <tr>
        <th>Date</th>
        <th>Rating</th>
        <th>Student</th>
        <th>Question</th>
      </tr>
    </thead>
    <tbody>
      {feedback.map(feedback => (
        <tr key={feedback.id}>
          <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
          <td>{feedback.rating} / 5</td>
          <th>
            <Link to={`/profile/${feedback.question.user.id}`}>
              {`${feedback.question.user.firstName} ${
                feedback.question.user.lastName
              }`}
            </Link>
          </th>
          <td>
            <Link to={`/dashboard/feedback/${feedback.id}`}>
              {feedback.question.title}
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default FeedbackTable;
