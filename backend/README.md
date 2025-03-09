# Healthcare Portal API

Backend API for the Healthcare Portal application.

## Deployment Instructions

### Deploying to Render

1. Create a new account on [Render](https://render.com/) if you don't have one.

2. Click on "New" and select "Web Service".

3. Connect your GitHub repository or use the "Public Git repository" option with the URL of your repository.

4. Configure the Web Service:
   - **Name**: healthcare-portal-api
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or select a paid plan if needed)

5. Add the following environment variables:
   - `PORT`: 10000 (Render will use its own PORT, but this is a fallback)
   - `MONGODB_URI`: Your MongoDB connection string (e.g., MongoDB Atlas)
   - `JWT_SECRET`: A secure random string for JWT token signing
   - `NODE_ENV`: production

6. Click "Create Web Service" and wait for the deployment to complete.

7. Once deployed, update the frontend API URL in `frontend/src/services/api.ts` and `frontend/src/api/axios.ts` to point to your Render URL.

### Setting up MongoDB Atlas

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account if you don't have one.

2. Create a new cluster (the free tier is sufficient for development).

3. Set up a database user with read/write permissions.

4. Whitelist all IP addresses (0.0.0.0/0) for simplicity, or restrict to Render's IP ranges for better security.

5. Get your connection string and replace `<username>`, `<password>`, and `<dbname>` with your actual values.

6. Add this connection string as the `MONGODB_URI` environment variable in Render.

## Local Development

1. Clone the repository.

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and fill in your local configuration.

4. Start the development server:
   ```
   npm run dev
   ```

5. The API will be available at `http://localhost:5000`.

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### User Endpoints

- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/profile-picture` - Upload profile picture

### Appointment Endpoints

- `GET /api/appointments` - Get all appointments for the current user
- `POST /api/appointments` - Create a new appointment
- `GET /api/appointments/:id` - Get a specific appointment
- `PUT /api/appointments/:id` - Update an appointment
- `DELETE /api/appointments/:id` - Cancel an appointment

### Doctor Endpoints

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get a specific doctor

### Medical Records Endpoints

- `GET /api/medical-records` - Get all medical records for the current user
- `POST /api/medical-records` - Create a new medical record
- `GET /api/medical-records/:id` - Get a specific medical record
- `PUT /api/medical-records/:id` - Update a medical record

### Message Endpoints

- `GET /api/messages` - Get all messages for the current user
- `POST /api/messages` - Send a new message
- `GET /api/messages/:id` - Get a specific message thread 