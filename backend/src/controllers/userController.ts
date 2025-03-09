import { Request, Response } from 'express';
import User from '../models/User';
import logger from '../utils/logger';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

/**
 * @desc    Get all doctors
 * @route   GET /api/users/doctors
 * @access  Public
 */
export const getDoctors = async (req: Request, res: Response) => {
  try {
    // Find all users with role 'doctor'
    const doctors = await User.find({ role: 'doctor' }).select('-password');
    
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}; 