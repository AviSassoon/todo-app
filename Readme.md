# TODO App

This repository contains two backend services and a frontend application that constitute the TODO App system:

1. **Todo Service**: This is the core service that manages all the CRUD operations of TODOs. It provides APIs to create, update, read, and delete TODOs.

2. **Notification Service**: This service is responsible for sending reminders about upcoming TODOs. It runs a cron job that frequently checks for TODOs that are due soon and sends out notifications for the same.

3. **Todo UI**: This is a React application that serves as the client-facing component. It consumes the APIs provided by the Todo Service to perform CRUD operations and display data to users.

These components are written in TypeScript and Javascript, running on Node.js. They use Express for managing HTTP requests, and the `dotenv` library for managing environment variables.

## Prerequisites

Before you start, make sure you have the following installed:

- Node.js
- npm
- Docker
- Docker Compose

## Running the Services and UI

I provide a Docker Compose configuration for running the entire application with a single command. Here are the steps:

1. In your terminal, navigate to the root of this repository (where the `docker-compose.yml` file is located).
2. Run `npm start`. This command will start Docker Compose, which will build and run containers for each service and the UI.

The services will be accessible at the following ports by default:

- Todo Service: 3000
- Notification Service: 3001
- Todo UI: 4000

To stop and shut down the running containers, you can use the following command: `npm stop`

## Assumptions

The following assumptions are made for running the TODO App system:

1. **Running with Docker**: If you are running the system with Docker using the provided docker-compose.yml file, you don't need to make any additional changes. The services and UI will be automatically configured to communicate with each other within the Docker network.

2. **Running Locally without Docker**:

- **Notification Service**: If you choose to run the `notification-service` locally without Docker, you need to define the `TODO_SERVICE_URL` environment variable in a `.env` file located in the `notification-service` directory. Set the variable value to the base URL of the
  Todo Service (e.g., http://localhost:3000).

- **Todo UI**: Similarly, if you want to run the `todo-ui` locally without Docker, you need to define the `REACT_APP_TODO_SERVICE_URL` environment variable in a `.env` file located in the `todo-ui` directory. Set the variable value to the base URL of the Todo Service (e.g., http://localhost:3000).
