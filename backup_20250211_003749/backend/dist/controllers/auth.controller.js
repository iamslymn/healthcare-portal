"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const logger_1 = require("../utils/logger");
const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, role, phoneNumber } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: 'User already exists'
            });
            return;
        }
        const user = await User_1.default.create({
            email,
            password,
            firstName,
            lastName,
            role: role || 'patient',
            phoneNumber
        });
        const verificationToken = user.generateAuthToken();
        res.status(201).json({
            success: true,
            message: 'Registration successful. Please verify your email.',
            token: verificationToken
        });
    }
    catch (error) {
        logger_1.logger.error('Registration Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error in user registration'
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
            return;
        }
        const user = await User_1.default.findOne({ email }).select('+password');
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
            return;
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
            return;
        }
        if (!user.isEmailVerified) {
            user.isEmailVerified = true;
            await user.save();
        }
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
    }
    catch (error) {
        logger_1.logger.error('Login Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error in user login'
        });
    }
};
exports.login = login;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            return;
        }
        const resetToken = user.generateAuthToken();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = new Date(Date.now() + 3600000);
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Password reset email sent'
        });
    }
    catch (error) {
        logger_1.logger.error('Forgot Password Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error in forgot password process'
        });
    }
};
exports.forgotPassword = forgotPassword;
//# sourceMappingURL=auth.controller.js.map