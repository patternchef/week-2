# Week 2

This week is a deeper dive into Express API development using MongoDB for data storage. The focus of this week will be on basic CRUD operations.

## Learning Objectives

At the end of this week, a student should:
- be able to create a MongoDB model
- be able to create basic CRUD HTTP routes for an entity
- be comfortable writing code with a Test-Driven Development (TDD) approach

## The assignment

The assignment this week is designed to introduce you to MongoDB and its basic functions. We will use MongoDB as the data source for two sets of CRUD routes within an Express server. We'll use these tools to write a Calendar API.

### Getting started

1. Make sure you have a recent version of [Node.js](https://nodejs.org/en/download/) installed on your computer. I am using Node v12.16, but anything above 12 will be fine.
2. Ensure you have git and github set up on your computer. If you do not, please follow this guide: https://help.github.com/en/github/getting-started-with-github.
3. Fork this repository and clone it locally. 
4. In your terminal, from inside this project directory, run `npm install` to install the project dependencies.
5. Download and install [MongoDB](https://www.mongodb.com/try/download/community). This project uses the default MongoDB configuration. If you run Mongo in a non-standard way you may need to update the configuration in `index.js` to match. If you have issues, reference the [Mongoose Connection Guide](https://mongoosejs.com/docs/connections.html).
6. Run `npm start` to start your local server. You should see a logged statement telling you `Server is listening on http://localhost:5000`.
7. Download [Postman](https://www.postman.com/) or an API client of your choice. Browse the various endpoints contained in this project. Practice calling all of them.
8. Run the unit tests of this project: `npm test`. Your test output should end in something like this:
```
Test Suites: 1 failed, 1 total
Tests:       16 failed, 4 passed, 20 total
```

### API definition

We are building a simple calendar API. There are two entities we are creating CRUD routes for: Calendars and Events.

* Calendars
  * GET /calendars/:id - returns calendar with provided id
  * POST /calendars - creates a calendar using the JSON in the request body
  * PUT /calendars/:id - updates calendar with the provided id to have the data in the request body
  * DELETE /calendars/:id - deletes a calendar with the provided id
  * GET /calendars - returns an array of all calendars
* Events
  * GET /calendars/:calendarId/events/:id - returns event with provided id from specified calendar 
  * POST /calendars/:calendarId/events - creates an event for the specified calendar using JSON from the request body
  * PUT /calendars/:calendarId/events/:id - updates event with provided id from specified calendar to have data from request body
  * DELETE /calendars/:calendarId/events/:id - deletes event with provided id from specified calendar
  * GET /calendars/:calendarId/events - get an array for all the events for the specified calendar

Calendar entity:
```js
{
  "name": string
}
```
Event entity:
```js
{
  "name": string,
  "date": Date
}
```

### Your Task

The desired API routes (above) are only partially completed at the start. Your task will be to complete the API to the specifications.

As you can see, there is a set of unit tests for this project's routes. However, the routes have not all been fully implemented yet. Your task is to implement the route definitions, DAO functions, and Mongoose models required to get all the tests to pass. To get full credit for this assignment, all tests must pass without any changes by you. 


### Grading

Component | Points
--------- | --------
All tests, as originally given, are passing. | 80
Clear, organized project structure | 20

### Submission

- Create a pull request (PR) from your repository to the main branch of this repository. Make your name the title of the PR. 
- Continuous Integration is handled using Github Actions. This will automatically run your tests and show the results on your PR. If you see a red X and a message saying `All checks have failed` then you will not receive full credit. Ensure all tests are passing in order to receive full marks.