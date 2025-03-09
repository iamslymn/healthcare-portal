import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const seedTestUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/doctor_appointment');
    console.log('Connected to MongoDB');

    // Create test users
    const testUsers = [
      {
        email: 'patient@test.com',
        password: await bcrypt.hash('Test123!', 10),
        firstName: 'Test',
        lastName: 'Patient',
        role: 'patient',
        phoneNumber: '1234567890',
        isEmailVerified: true,
      },
      {
        email: 'doctor@test.com',
        password: await bcrypt.hash('Test123!', 10),
        firstName: 'Test',
        lastName: 'Doctor',
        role: 'doctor',
        phoneNumber: '1234567890',
        isEmailVerified: true,
      },
    ];

    // Delete existing test users
    await User.deleteMany({ email: { $in: testUsers.map(user => user.email) } });

    // Insert new test users
    await User.insertMany(testUsers);
    console.log('Test users created successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding test users:', error);
    process.exit(1);
  }
};

seedTestUsers(); 