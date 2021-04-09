# NodeJS Typescript Mongo Boilerplate

---

## Roadmap

| xxx | Name                            | When                    |
| --- | ------------------------------- | ----------------------- |
| [x] | CRUD to mongodb                 |
| [x] | Auth Session with redis         |
| [x] | Middleware System               |
| [x] | Error Handling                  |
| [x] | File Upload                     |
| [x] | OAuth Github & Google           |
| [x] | Email                           | April 6                 |
| [x] | Containerize with Docker        | April 8                 |
| [x] | Absolute timeout on Sessions    | April 9                 |
| [x] | Reset Password                  | April 9                 |
| [x] | Start prompt with chalk         | April 9                 |
| [ ] | Auth Retry Limit                | How to implement ?      |
| [x] | Database Seed with Faker        | After retry & reset     |
| [ ] | Logger                          | After seed              |
| [ ] | E2E tests                       | Soon                    |
| [ ] | Separate ROOT from backend      | Soon                    |
| [ ] | Husky setup                     | After root is seperated |
| [ ] | Frontend sample usage endpoints | Unsure if will do       |

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
