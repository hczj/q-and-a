<p align="center">
  <img src="./public/images/logo.png" alt="Q&A logo"/>
</p>

Q&A is an education-focused app that provides a platform for students to get their questions answered when they're not in class. Students can submit questions to a live queue and they'll be connected to a teacher in a video classroom, which includes educational tools such as a live whiteboard, code and text editor.

This app was built during a two-week sprint as the capstone project for four students at [Fullstack Academy](https://www.fullstackacademy.com/) in Chicago. The project requirements were to create a prototype application that incorporated web technologies learned during the program, as well as new technologies we were interested in exploring. We decided to work with [WebRTC](https://webrtc.org) and [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) to create a learning platform designed for real-time collaboration.

## Tech Talk Presentation

[![Q&A Demo Video](http://img.youtube.com/vi/gxCZrut25-c/0.jpg)](http://www.youtube.com/watch?v=gxCZrut25-c 'Q&A Demo')

## Live Demo

https://q-and-a-fullstack.herokuapp.com/

### Login credentials

| Username            | Password |
| ------------------- | -------- |
| teacher@example.com | test     |
| student@example.com | test     |

These credentials will work with the deployed application and a local install.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. You'll need:

- Node.js
- PSQL

### Setup

- `npm install`
- Create two PostgreSQL databases: `capstone` and `capstone-test`
- `npm run seed`
- `npm run start-dev`
- Navigate to http://localhost:8080/

## Technologies

- [React](https://reactjs.org) - JavaScript library for building user interfaces
- [Redux](https://redux.js.org) - front-end state management
- [WebRTC](https://webrtc.org) - open-source APIs that provide browsers and apps with real-time communication
- [Socket.io](https://socket.io/docs) - library for real-time communication between server and client
- [Express](https://github.com/expressjs/express) - web framework for Node
- [Sequelize](https://docs.sequelizejs.com) - an ORM for database queries
- [PostgreSQL](https://www.postgresql.org) - object-relational database management system

## Developers

- [Hollie Lambert](https://github.com/hollielu)
- [Chris Lusk](https://github.com/chrismlusk)
- [Zohaib Farooqi](https://github.com/zobee29)
- [Jerry Wu](https://github.com/wujerry573)

## Link to Demo Video

https://youtu.be/gxCZrut25-c
