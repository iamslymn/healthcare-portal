# Healthcare Portal

A modern healthcare portal application for managing doctor appointments, medical records, and patient-doctor communication.

## Features

- User authentication (login, register, forgot password)
- Dashboard for patients and doctors
- Appointment scheduling and management
- Medical records management
- Messaging system
- Profile management
- Dark/light mode
- Responsive design

## Tech Stack

### Frontend
- React
- TypeScript
- Material-UI
- Ant Design
- Redux Toolkit
- React Router
- Axios
- Vite

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- JWT Authentication
- Socket.io

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/healthcare-portal.git
cd healthcare-portal
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# In the backend directory, create a .env file based on .env.example
cp .env.example .env
# Edit the .env file with your MongoDB connection string and JWT secret
```

4. Start the development servers
```bash
# Start backend server (from the backend directory)
npm run dev

# Start frontend server (from the frontend directory)
npm run dev
```

5. Open your browser and navigate to:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Deployment

The frontend is automatically deployed to GitHub Pages when changes are pushed to the master branch.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 