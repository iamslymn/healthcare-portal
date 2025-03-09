import { Request, Response } from 'express';
import User from '../models/User';
import { logger } from '../utils/logger';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName, role, phoneNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User already exists'
      });
      return;
    }

    // Validate role
    if (!role || !['patient', 'doctor'].includes(role)) {
      res.status(400).json({
        success: false,
        message: 'Invalid role specified'
      });
      return;
    }

    // Create user with explicit role
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      role,
      phoneNumber
    });

    // Generate verification token
    const verificationToken = user.generateAuthToken();

    // Return user data along with token
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token: verificationToken,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    logger.error('Registration Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error in user registration'
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
      return;
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
      return;
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
      return;
    }

    // For testing purposes, we'll skip email verification
    // Remove this in production
    if (!user.isEmailVerified) {
      user.isEmailVerified = true;
      await user.save();
    }

    // Generate token
    const token = user.generateAuthToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    logger.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error in user login'
    });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Generate reset token
    const resetToken = user.generateAuthToken();
    
    // Set reset token and expiry
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // TODO: Send password reset email

    res.status(200).json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    logger.error('Forgot Password Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error in forgot password process'
    });
  }
}; 