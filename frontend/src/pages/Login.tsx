import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Alert, Space, Row, Col, Image } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useThemeMode } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { AppDispatch, RootState } from '../store';

const { Title, Text } = Typography;

interface LoginFormData {
  email: string;
  password: string;
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
  max-width: 1000px;
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

  .ant-form-item-label > label {
    color: ${(props: StyledProps) => props.$isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)'};
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
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const [form] = Form.useForm();
  
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (values: LoginFormData) => {
    try {
      const result = await dispatch(login(values)).unwrap();
      if (result) {
        navigate('/dashboard');
      }
    } catch (err) {
      // Error is handled by the Redux slice
      console.error('Login failed:', err);
    }
  };

  return (
    <PageWrapper $isDark={isDark}>
      <StyledCard $isDark={isDark}>
        <Row>
          <Col xs={24} md={12} className="form-column">
            <div className="welcome-text" style={{ textAlign: 'center' }}>
              <Title level={2} style={{ 
                marginBottom: 8,
                color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)',
                fontSize: '2.5rem',
                fontWeight: 600
              }}>
                Welcome Back
              </Title>
              <Text style={{ 
                color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
                fontSize: '1.1rem'
              }}>
                Sign in to your account
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
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
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
                  Sign In
                </Button>
              </Form.Item>

              <Space direction="vertical" size="small" style={{ width: '100%', textAlign: 'center' }}>
                <RouterLink to="/forgot-password">
                  <Text style={{ 
                    color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'
                  }}>
                    Forgot password?
                  </Text>
                </RouterLink>
                <Text style={{ 
                  color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'
                }}>
                  Don't have an account?{' '}
                  <RouterLink to="/register">
                    <Text style={{ color: '#1890ff' }}>Sign Up</Text>
                  </RouterLink>
                </Text>
              </Space>
            </Form>
          </Col>
          <Col xs={24} md={12} className="image-column">
            <Image
              src="https://img.freepik.com/free-vector/medical-video-call-online-conference-illustration_88138-415.jpg"
              alt="Healthcare Illustration"
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

export default Login;