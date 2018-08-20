import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button } from '../../components';

const Question = ({ question, isTeacher, closeQuestion, myId }) => {
  const { title, description, topics, user, createdAt } = question;
  return (
    <div className="box">
      <div className="columns">
        <div className="column is-one-fifth">
          <figure className="image is-96x96">
            <img className="is-rounded" src={user.imageUrl} />
          </figure>
          <Link to={`/profile/${user.id}`}>{`${user.firstName} ${
            user.lastName
          }`}</Link>
          <div>asked {moment(createdAt).fromNow()}</div>
        </div>

        <div className="column">
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <Link to={`/questions/question/${question.id}`}>
                  <h1 className="title is-4">{title}</h1>
                </Link>
              </div>
            </div>

            <div className="level-right">
              <div className="level-item">
                {isTeacher && (
                  <Button
                    link="/classroom"
                    text="Answer"
                    classes="button is-link"
                    state={{
                      questionId: question.id,
                      studentId: user.id,
                      teacherId: myId
                    }}
                  />
                )}
                {myId === question.userId && (
                  <button
                    type="button"
                    className="button is-link"
                    onClick={() => closeQuestion(question)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </nav>
          <div className="content">{description}</div>
          <div className="tags">
            {topics.map(topic => (
              <span key={topic.id} className="tag">
                {topic.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
