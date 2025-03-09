import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/database';
import { logger } from './utils/logger';
import authRoutes from './routes/auth.routes';

// Load environment variables
dotenv.config();

// Create Express app
const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Socket.io Connection
io.on('connection', (socket) => {
  logger.info('A user connected');

  socket.on('disconnect', () => {
    logger.info('User disconnected');
  });
});

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5004;
httpServer.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
}); 