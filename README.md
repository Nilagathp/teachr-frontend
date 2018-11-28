# Flatiron Final Project - Teachr [![Build Status](https://travis-ci.com/jensnyder/teachr-frontend.svg?branch=master)](https://travis-ci.com/jensnyder/teachr-frontend)

This project was created as a streamlined single-page web application for teachers to create and manage their students' assignments.
Live demo: https://teachr-app.herokuapp.com

## Teachers are able to:

- log-in
- view the courses they teach
- view and filter assignments by due date, category, and course
- create assignments of various types
- choose whether to assign to students now or later
- view student assignments and filter by status
- view student responses on submitted assignments
- assign a grade to students' assignments

## Students are able to:

- log-in
- view the courses in which they are enrolled
- view and filter assignment by course, category, due date, and status
- input answers to assignments
- save assignments to return to finish later
- submit assignments to their teachers
- view their grades on graded assignments

## Run Locally:

### Run the Back End First

- This front-end app requires the back-end Rails API to run first. Follow the directions to run the back-end at https://github.com/jensnyder/teachr-backend
- Verify that the back-end is running at http://localhost:3000/ You will be able to view all of the teachers in the database at http://localhost:3000/teachers

### Run the Front End

```
git clone git@github.com:jensnyder/teachr-frontend.git
cd teachr-frontend
yarn start
```

- The React app should open automatically in the browser at http://localhost:3001/

### Run Tests

```
yarn test
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
