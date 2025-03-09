"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const seedTestUsers = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/doctor_appointment');
        console.log('Connected to MongoDB');
        const testUsers = [
            {
                email: 'patient@test.com',
                password: await bcryptjs_1.default.hash('Test123!', 10),
                firstName: 'Test',
                lastName: 'Patient',
                role: 'patient',
                phoneNumber: '1234567890',
                isEmailVerified: true,
            },
            {
                email: 'doctor@test.com',
                password: await bcryptjs_1.default.hash('Test123!', 10),
                firstName: 'Test',
                lastName: 'Doctor',
                role: 'doctor',
                phoneNumber: '1234567890',
                isEmailVerified: true,
            },
        ];
        await User_1.default.deleteMany({ email: { $in: testUsers.map(user => user.email) } });
        await User_1.default.insertMany(testUsers);
        console.log('Test users created successfully');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding test users:', error);
        process.exit(1);
    }
};
seedTestUsers();
//# sourceMappingURL=seedTestUsers.js.map