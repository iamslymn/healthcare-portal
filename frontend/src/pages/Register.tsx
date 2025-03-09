import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Alert, Select, Space, Row, Col, Image } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { register } from '../store/slices/authSlice';
import { RootState } from '../store';
import { AppDispatch } from '../store';
import { useThemeMode } from '../App';

const { Title, Text } = Typography;
const { Option } = Select;

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
}

interface StyledProps {
  $isDark: boolean;
}

const PageWrapper = styled.div<StyledProps>`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props: StyledProps) => props.$isDark 
    ? 'linear-gradient(135deg, #141414 0%, #1f1f1f 100%)'
    : 'linear-gradient(135deg, #f0f2f5 0%, #ffffff 100%)'};
  transition: all 0.3s ease;
  padding: 24px;
`;

const StyledCard = styled(Card)<StyledProps>`
  width: 100%;
  max-width: 1200px;
  background: ${(props: StyledProps) => props.$isDark ? '#1f1f1f' : '#ffffff'};
  border: 1px solid ${(props: StyledProps) => props.$isDark ? '#303030' : '#f0f0f0'};
  box-shadow: 0 8px 24px ${(props: StyledProps) => props.$isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'};
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(10px);

  .ant-card-body {
    padding: 0;
  }

  .form-column {
    padding: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .image-column {
    background: ${(props: StyledProps) => props.$isDark ? '#141414' : '#f6f8fa'};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
    position: relative;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${(props: StyledProps) => props.$isDark 
        ? 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)'
        : 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)'};
      z-index: 1;
    }

    img {
      position: relative;
      z-index: 2;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }
    }
  }

  .ant-input-affix-wrapper {
    background: ${(props: StyledProps) => props.$isDark ? '#141414' : '#ffffff'};
    border-color: ${(props: StyledProps) => props.$isDark ? '#303030' : '#d9d9d9'};
    border-radius: 8px;
    padding: 12px;
    transition: all 0.3s ease;
    
    &:hover, &:focus {
      border-color: #1890ff;
      box-shadow: 0 0 0 2px ${(props: StyledProps) => props.$isDark 
        ? 'rgba(24,144,255,0.1)'
        : 'rgba(24,144,255,0.2)'};
    }

    input {
      background: ${(props: StyledProps) => props.$isDark ? '#141414' : '#ffffff'};
      color: ${(props: StyledProps) => props.$isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)'};
    }

    .anticon {
      color: ${(props: StyledProps) => props.$isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'};
      font-size: 16px;
    }
  }

  .ant-select-selector {
    background: ${(props: StyledProps) => props.$isDark ? '#141414' : '#ffffff'} !important;
    border-color: ${(props: StyledProps) => props.$isDark ? '#303030' : '#d9d9d9'} !important;
    color: ${(props: StyledProps) => props.$isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)'} !important;
    border-radius: 8px !important;
    padding: 8px 12px !important;
    height: 45px !important;
    transition: all 0.3s ease;

    .ant-select-selection-item {
      line-height: 30px !important;
    }

    &:hover {
      border-color: #1890ff !important;
      box-shadow: 0 0 0 2px ${(props: StyledProps) => props.$isDark 
        ? 'rgba(24,144,255,0.1)'
        : 'rgba(24,144,255,0.2)'} !important;
    }
  }

  .ant-btn {
    height: 45px;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px ${(props: StyledProps) => props.$isDark 
        ? 'rgba(24,144,255,0.4)'
        : 'rgba(24,144,255,0.2)'};
    }
  }

  .welcome-text {
    margin-bottom: 48px;
  }

  .form-row {
    margin-bottom: 24px;
  }
`;

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const [form] = Form.useForm();

  const handleSubmit = async (values: RegisterFormData) => {
    if (values.password !== values.confirmPassword) {
      form.setFields([
        {
          name: 'confirmPassword',
          errors: ['Passwords do not match'],
        },
      ]);
      return;
    }
    await dispatch(register(values));
  };

  return (
    <PageWrapper $isDark={isDark}>
      <StyledCard $isDark={isDark}>
        <Row>
          <Col xs={24} md={14} className="form-column">
            <div className="welcome-text" style={{ textAlign: 'center' }}>
              <Title level={2} style={{ 
                marginBottom: 8,
                color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)',
                fontSize: '2.5rem',
                fontWeight: 600
              }}>
                Create Account
              </Title>
              <Text style={{ 
                color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
                fontSize: '1.1rem'
              }}>
                Join our healthcare platform
              </Text>
            </div>

            {error && (
              <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
                style={{ marginBottom: 24 }}
              />
            )}

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                  >
                    <Input
                      prefix={<IdcardOutlined />}
                      placeholder="First Name"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                  >
                    <Input
                      prefix={<IdcardOutlined />}
                      placeholder="Last Name"
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Email"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Phone Number"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="role"
                rules={[
                  { 
                    required: true,
                    message: 'Please select your role!'
                  },
                  {
                    validator: (_, value) => {
                      if (!value || !['patient', 'doctor'].includes(value)) {
                        return Promise.reject('Please select a valid role');
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Select 
                  size="large" 
                  placeholder="Select Role"
                  defaultValue={undefined}
                >
                  <Option value="patient">Patient</Option>
                  <Option value="doctor">Doctor</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { min: 6, message: 'Password must be at least 6 characters!' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm Password"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  size="large"
                >
                  Register
                </Button>
              </Form.Item>

              <div style={{ textAlign: 'center' }}>
                <Text style={{ 
                  color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'
                }}>
                  Already have an account?{' '}
                  <RouterLink to="/login">
                    <Text style={{ color: '#1890ff' }}>Sign In</Text>
                  </RouterLink>
                </Text>
              </div>
            </Form>
          </Col>
          <Col xs={24} md={10} className="image-column">
            <Image
              src="https://img.freepik.com/free-vector/doctors-concept-illustration_114360-1515.jpg"
              alt="Healthcare Registration Illustration"
              preview={false}
              style={{ 
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 12,
                filter: isDark ? 'brightness(0.9)' : 'none'
              }}
            />
          </Col>
        </Row>
      </StyledCard>
    </PageWrapper>
  );
};

export default Register; 