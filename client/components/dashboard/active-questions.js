import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ActiveQuestions = ({ questions }) => {
  return (
    <div className="card events-card">
      <header className="card-header">
        <p className="card-header-title">Active Questions</p>
        <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fa fa-angle-down" aria-hidden="true" />
          </span>
        </a>
      </header>

      <div className="card-table">
        <div className="content">
          {questions.length > 0 ? (
            <table className="table is-fullwidth is-hoverable">
              <tbody>
                {questions.map(question => {
                  return (
                    <tr key={question.id}>
                      <td width="10%">
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
      </div>
      <footer className="card-footer">
        <Link to="/questions" className="card-footer-item">
          View All
        </Link>
      </footer>
    </div>
  );
};

export default ActiveQuestions;
