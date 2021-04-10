# NodeJS Typescript Mongo Boilerplate

---

## Roadmap

| xxx | Name                            | When                    |
| --- | ------------------------------- | ----------------------- |
| ✓   | CRUD to mongodb                 |
| ✓   | Auth Session with redis         |
| ✓   | Middleware System               |
| ✓   | Error Handling                  |
| ✓   | File Upload                     |
| ✓   | OAuth Github & Google           |
| ✓   | Email                           | April 6                 |
| ✓   | Containerize with Docker        | April 8                 |
| ✓   | Absolute timeout on Sessions    | April 9                 |
| ✓   | Reset Password                  | April 9                 |
| ✓   | Start prompt with chalk         | April 9                 |
|     | Auth Retry Limit                | How to implement ?      |
| ✓   | Database Seed with Faker        | After retry & reset     |
|     | Logger                          | Unsure if will do       |
|     | E2E tests                       | Soon                    |
| ✓   | Separate ROOT from backend      | Soon                    |
| ✓   | Husky setup                     | After root is seperated |
| ✓   | Frontend sample usage endpoints | After husky setup       |
|     | Transfer from `joi` to `zod`    | Frontend is done        |

---

## TechStack

Typescript front to back

- ReactJS
- NodeJS
  - Express
  - MongoDB
- Joi for input validation

## Features

- Complete MongoDB Auth System (Reset password, Email verification, Sessions)
- Husky (Lint-staged,Eslint) setup
- Typescript Full stack
- Docker Services
- Sessions with Redis
- Schema Validation using Joi
- OAuth with github and google

## Run Locally

### Requirements

- NodeJS
- Docker
- Yarn(preferred)/NPM

### Backend

1. Run `git clone https://github.com/romanmunar/express-sessions-react-typescript-starter`
2. Run `cd express-sessions-react-typescript-starter` and Run `yarn`
3. Install packages on backend `cd ./api`, Run `yarn`
4. While installing, Fill up the `.env.example` file with your own creds.(avoid changing the ports)
5. Run `yarn up` to start the docker services
6. Run `yarn dev` to run nodemon and watch tsc

### Client

1. Open a new terminal and `cd ../react-client`
2. Install packages on client, run `yarn`
3. Run `yarn dev` to start the dev server
4. Open browser to [a](http://localhost:3000)

---
