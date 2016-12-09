# Oh Auth! :grimacing:

We are building a platform to help you keep track of how many issues you open and close each week.

![Mockup](https://github.com/esraajb/oh-auth/blob/master/assets/OhAuth%20mockup.png)

## Installation instructions
- Clone the repo
- Run ```npm install```
- Add a postgres admin called ```CREATE USER ohadmin WITH SUPERUSER PASSWORD 'letmein';```
- Add the database ```CREATE DATABASE ohauth_db OWNER ohadmin;```
- Add a config.env file with the env variables in it (get these from us)
- Run ```node src/db_build.js``` to build the database
- Run ```npm start``` to start the database
- Go to localhost:4000

### Dependencies
- Hapi
- Inert
- Env2
- Request

### Key files
[to be added]

## Who, what why
### Who
**I am** a student developer
**And I want to** improve my efficiency and make sure I complete tasks
**So I can** develop good work practices

### What
#### Velocity tracker
- get a list of issues assigned to a user
- sort them into open v closed
- 'in the last week how many issues that are assigned to me have been open vs those that have been opened'

STRETCH GOAL: visualise the data using chart.js

Testing?
- Server
- Nightwatch

### Why
To learn about OAuth, JWTs and cookies
