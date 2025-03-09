import { AuthResponse, LoginCredentials, RegisterData } from './api';

// Mock user database
const users = [
  {
    id: '1',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    password: 'password123',
    role: 'patient',
  },
];

// Mock token generation
const generateToken = (userId: string): string => {
  return `mock-token-${userId}-${Date.now()}`;
};

// Mock delay to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    await delay(500); // Simulate network delay
    
    const user = users.find(u => u.email === email);
    
    if (!user || user.password !== password) {
      throw {
        response: {
          data: {
            message: 'Invalid email or password',
          },
          status: 401,
        },
      };
    }
    
    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken(user.id);
    
    return {
      success: true,
      token,
      user: userWithoutPassword,
    };
  },
  
  async register(userData: RegisterData): Promise<AuthResponse> {
    await delay(500); // Simulate network delay
    
    // Check if user already exists
    if (users.some(u => u.email === userData.email)) {
      throw {
        response: {
          data: {
            message: 'User with this email already exists',
          },
          status: 400,
        },
      };
    }
    
    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
      role: userData.role || 'patient',
      phoneNumber: userData.phoneNumber,
    };
    
    users.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    const token = generateToken(newUser.id);
    
    return {
      success: true,
      token,
      user: userWithoutPassword,
    };
  },
  
  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    await delay(500); // Simulate network delay
    
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw {
        response: {
          data: {
            message: 'User with this email does not exist',
          },
          status: 404,
        },
      };
    }
    
    return {
      success: true,
      message: 'Password reset instructions sent to your email',
    };
  },
  
  async resetPassword(token: string, password: string): Promise<{ success: boolean; message: string }> {
    await delay(500); // Simulate network delay
    
    // In a real implementation, we would validate the token
    // For mock purposes, we'll just assume it's valid
    
    return {
      success: true,
      message: 'Password reset successfully',
    };
  },
  
  logout() {
    // No need to do anything in the mock implementation
  },
}; 