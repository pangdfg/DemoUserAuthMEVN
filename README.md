# DemoUserAuthMEVN

This is a MEVN stack application using JSON Web Tokens (JWT) for authentication.

## Project Structure

- `frontend/`: Vue.js application
- `backend/`: Express.js server
- `docker-compose.yml`: Docker configuration for MongoDB

## Prerequisites

- Node.js
- Docker (for MongoDB)

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/pangdfg/DemoUserAuthMEVN.git
    cd DemoUserAuthMEVN
    ```

2. Install dependencies for both frontend and backend:
    ```sh
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Start MongoDB using Docker:
    ```sh
    docker-compose up -d
    ```

4. Start the backend server:
    ```sh
    cd backend
    npm run dev
    ```

5. Start the frontend application:
    ```sh
    cd frontend
    npm run dev
    ```

## Usage

- Open your browser and navigate to `http://localhost:5173` for the frontend application.
- The backend server runs on `http://localhost:8080`.

## Scripts

### Frontend

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build
- `npm run lint`: Lint the code
- `npm run format`: Format the code

### Backend

- `npm run dev`: Start the development server with nodemon
- `npm run start`: Start the server
- `npm run test`: Run tests with Jest
