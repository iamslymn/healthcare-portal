import express from 'express';
import { protect } from '../middleware/auth';
import { getDoctors } from '../controllers/userController';

const router = express.Router();

// Public routes
router.get('/doctors', getDoctors);

// Protected routes
router.use(protect);

// ... existing routes ...

export default router; 