import React from 'react';
import { Link } from '@reach/router';
import moment from 'moment';

const ActiveQuestions = ({ questions }) => (
  <div className="tile is-child box" style={{ padding: 0 }}>
    <div className="card" style={{ height: '100%' }}>
      <header className="card-header">
        <p className="card-header-title">Active Questions</p>
        <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fa fa-angle-down" aria-hidden="true" />
          </span>
        </a>
      </header>

      <div className="card-content" style={{ flexGrow: 1 }}>
        {questions.length > 0 ? (
          <table className="table is-fullwidth is-hoverable">
            <tbody>
              {questions.map(question => {
                return (
                  <tr key={question.id}>
                    <td>
                      <i className="fa fa-comment-alt" />
                    </td>
                    <td>{question.title}</td>
                    <td>{moment(question.createdAt).fromNow()}</td>
                    <td>
                      <Link
                        to={`/questions/question/${question.id}`}
                        className="button is-small is-primary"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="box">
            <p>You currently have no active questions!</p>
          </div>
        )}
      </div>
      <footer className="card-footer">
        {questions.length > 0 ? (
          <Link to="/questions" className="card-footer-item">
            View All
          </Link>
        ) : (
          <Link to="/ask-a-question" className="card-footer-item">
            Ask A Question
          </Link>
        )}
      </footer>
    </div>
  </div>
);

export default ActiveQuestions;
