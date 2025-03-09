# Doctor-Patient Appointment System

A modern web application for managing doctor-patient appointments, consultations, and medical services.

## Features

- User Authentication & Registration (Doctors & Patients)
- Profile Management
- Appointment Scheduling
- Real-time Chat & Video Consultations
- Search & Filter Doctors
- Payment Integration
- Admin Dashboard
- Notifications System

## Tech Stack

### Frontend
- React 18
- TypeScript
- Material-UI
- Redux Toolkit
- Socket.io Client
- Axios

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- JWT Authentication
- Socket.io

### DevOps & Tools
- Docker
- ESLint
- Prettier
- Jest
- GitHub Actions

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/.env.example backend/.env
```

4. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm start
```

## Project Structure

```
.
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store
│   │   └── types/         # TypeScript types
│   └── public/            # Static files
│
├── backend/                # Node.js backend application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
│   └── tests/             # Backend tests
│
└── README.md              # Project documentation
```

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 