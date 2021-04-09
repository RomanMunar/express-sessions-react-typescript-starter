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
|     | Frontend sample usage endpoints | After husky setup       |
|     | Transfer from `joi` to `zod`    | Frontend is done        |

---

## TechStack

Typescript front to back

- ReactJS
  - Redux w/ redux-toolkit
  - Tailwind / Styled-system based CSS-in-JS
- NodeJS
  - Express
  - MongoDB

## Features

- Complete MongoDB Auth System (Reset password, Email verification, encryption, etc...)
- Docker Services
- Sessions with Redis
- Schema Validation using Joi
- ***

## Run Locally

1. Install following programs

- NodeJS
- Docker
- Yarn(preferred)/NPM

2. Run `git clone https://github.com/romanmunar/typescript-nodejs-express-passport-session-starter`
3. Run `cd typescript-nodejs-express-passport-session-starter` and Run `yarn`
4. While installing, Fill up the `.env.example` file with your own creds.
5. Run `yarn up` to start the docker services
6. Run `yarn dev` to run nodemon and watch tsc

---
