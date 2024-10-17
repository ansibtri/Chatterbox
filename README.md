# Chatterbox

**Chatterbox** is a full-stack real-time chat application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with **Material UI** for a clean, responsive UI and **Socket.io** for real-time messaging capabilities. This app allows users to engage in both group and private chats with an intuitive, modern interface.

## Features

- **Real-time Messaging**: Instant message updates using Socket.io for fast, two-way communication.
- **User Authentication**: Secure login and registration system using JWT (JSON Web Token) authentication.
- **Group and Private Chats**: Support for creating group chats or engaging in private one-on-one conversations.
- **Material UI Design**: A visually appealing, mobile-responsive interface built with Material UI components.
- **Fully Responsive**: Optimized for both mobile and desktop screens for a seamless experience.
- **RESTful API**: Built with Express.js and Node.js for efficient API calls and user management.
- **Message History**: Stores and retrieves chat history using MongoDB, ensuring data persistence.

## Tech Stack

- **Frontend**: React.js with Material UI
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.io
- **Authentication**: JWT (JSON Web Tokens)
  
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Chatterbox.git
   ```
   
2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Create a `.env` file in the server folder for environment variables like your MongoDB URI and JWT secret:
   ```bash
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the development server for both backend and frontend:
   ```bash
   # Run backend server
   cd server
   npm run dev

   # Run frontend client
   cd ../client
   npm start
   ```

## Usage

1. Register a new account or log in with existing credentials.
2. Create new group chats or start private conversations with other users.
3. Send real-time messages and enjoy the fully responsive, modern UI.

## Learning Goals

This project is designed to help me improve my skills in:
- **React.js** and **Material UI** for building responsive, interactive front-end user interfaces.
- **Socket.io** for handling real-time communication.
- **Express.js** and **Node.js** for creating scalable server-side APIs.
- **MongoDB** for managing chat history and user data.