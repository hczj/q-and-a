import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button } from '../../components';

const Question = ({ question, isTeacher, closeQuestion, myId }) => {
  const { title, description, topics, user, createdAt } = question;
  return (
    <div className="question-card">
      <div className="columns">
        <div className="column question-student">
          <Link to={`/profile/${user.id}`}>
            <figure className="image is-64x64">
              <img className="is-rounded" src={user.imageUrl} />
            </figure>
            <p className="name">{user.name}</p>
          </Link>
          <div className="time">asked {moment(createdAt).fromNow()}</div>
        </div>
        <div className="column question-content">
          <div className="content">
            <h2 className="title is-4">
              <Link to={`/questions/question/${question.id}`}>
                {title}
              </Link>
            </h2>
            <p>{description}</p>
            <div className="tags">
              {topics.map(topic => (
                <span key={topic.id} className="tag is-rounded">
                  {topic.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="column question-actions">
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
          <Button
            link={`/questions/question/${question.id}`}
            text="See more"
            classes="button is-outlined is-link"
          />
        </div>
      </div>
    </div>
  );
};

export default Question;
