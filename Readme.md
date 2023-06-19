# TODO App

This repository contains two microservices as part of the TODO App system:

1. **Todo Service**: This is the core service that manages all the CRUD operations of TODOs. It provides APIs to create, update, read, and delete TODOs.

2. **Notification Service**: This service is responsible for sending reminders about upcoming TODOs. It runs a cron job that frequently checks for TODOs that are due soon and sends out notifications for the same.

Both services are written in TypeScript and run on Node.js. They use Express for managing HTTP requests, and the `dotenv` library for managing environment variables.

## Prerequisites

Before you start, make sure you have the following installed:

- Node.js
- npm

## Running the Services

### Todo Service

To run the Todo Service, follow these steps:

1. Navigate to the `todo-service` directory.
2. Install the dependencies with `npm install`.
3. Start the service with `npm run dev` for development mode. You can also build the TypeScript files and start the service in production mode with `npm run build` and `npm start`.
4. To run the tests, execute: `npm run jest`

### Notification Service

To run the Notification Service, follow these steps:

1. Navigate to the `notification-service` directory.
2. Install the dependencies with `npm install`.
3. Start the service with `npm run dev` for development mode. You can also build the TypeScript files and start the service in production mode with `npm run build` and `npm start`.

## Assumptions

1. You have a MongoDB instance running for the Todo Service to connect to. The connection string should be provided in a `.env` file in the `todo-service` directory, under the variable `DB_URL`.
2. The Notification Service makes requests to the Todo Service to fetch TODOs. The base URL for these requests should be provided in a `.env` file in the `notification-service` directory, under the variable `TODO_SERVICE_URL`.
