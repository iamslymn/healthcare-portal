import express from 'express';
import { register, login, forgotPassword } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth';
import { IUser } from '../models/User';

// Import the AuthRequest interface from auth middleware
interface AuthRequest extends express.Request {
  user?: IUser;
}

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

// Protected routes
router.get('/me', protect, (req: AuthRequest, res: express.Response) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
});

export default router; 