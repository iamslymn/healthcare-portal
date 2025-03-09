import express from 'express';
import { protect } from '../middleware/auth';
import { upload, uploadProfilePicture } from '../controllers/user.controller';

const router = express.Router();

// Protected routes
router.use(protect);

// Upload profile picture
router.post('/profile-picture', upload.single('profilePicture'), uploadProfilePicture);

export default router; 