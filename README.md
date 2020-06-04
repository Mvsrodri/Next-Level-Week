## Project

Ecoleta is a project developed to connect people to companies that collect recyclable materials such as light bulbs, batteries, cooking oil, etc.

## Technologies

- Node.js
- TypeScript
- React
- React Native
- SQLite

## Layout

To access the layout use [Figma](https://www.figma.com/file/1SxgOMojOB2zYT0Mdk28lB/).

## Application Folders
- Back-end: server
- Front-end: web

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js][nodejs] + [Npm][npm] or [Yarn][yarn] installed on your computer.


### Install API

```bash
# Clone this repository
$ git clone https://github.com/DanielObara/NLW-1.0

# Go into the repository
$ cd NLW-Ecoleta/server

# Install dependencies
$ npm install

Or:

$ yarn install
# Run Migrates
$ npx knex migrate:latest --knexfile knexfile.ts

or:

$ yarn knex:migrate
# Run Seeds
$ npx knex seed:run --knexfile knexfile.ts

or:

$ yarn knex:seed
# Start server
$ npm run dev

or:

$ yarn dev

running on port 3333
```
