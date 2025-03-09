import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography, Row, Col, Card, Space, Carousel, theme, Image, List, Divider } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  MessageOutlined,
  HeartOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  BgColorsOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useThemeMode } from '../App';

const { Title, Paragraph } = Typography;
const { useToken } = theme;

// Enhanced Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-15px) rotate(1deg);
  }
  75% {
    transform: translateY(-5px) rotate(-1deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255,255,255,0.4);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255,255,255,0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255,255,255,0);
  }
`;

const shine = keyframes`
  0% {
    background-position: 200% center;
  }
  100% {
    background-position: -200% center;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const rotateIn = keyframes`
  from {
    transform: perspective(1000px) rotateY(-45deg);
    opacity: 0;
  }
  to {
    transform: perspective(1000px) rotateY(0);
    opacity: 1;
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

// Styled Components with enhanced dark mode support
const PageWrapper = styled.div<{ $isDark: boolean }>`
  min-height: 100vh;
  background: ${props => props.$isDark 
    ? 'linear-gradient(135deg, #0A1929 0%, #1A365D 50%, #2A4365 100%)'
    : 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 50%, #90CAF9 100%)'};
  color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$isDark
      ? 'radial-gradient(circle at 50% 0%, rgba(25, 118, 210, 0.15) 0%, transparent 50%)'
      : 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.8) 0%, transparent 50%)'};
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$isDark
      ? 'radial-gradient(circle at 80% 80%, rgba(121, 40, 202, 0.15) 0%, transparent 50%)'
      : 'radial-gradient(circle at 80% 80%, rgba(33, 150, 243, 0.15) 0%, transparent 50%)'};
    pointer-events: none;
  }
`;

const AnimatedSection = styled.div<{ $delay?: string }>`
  animation: ${fadeIn} 1s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;
`;

const FloatingCard = styled(Card)<{ $isDark: boolean }>`
  margin: 24px;
  background: ${props => props.$isDark 
    ? 'linear-gradient(135deg, rgba(26, 32, 44, 0.8) 0%, rgba(45, 55, 72, 0.8) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 250, 252, 0.9) 100%)'};
  border: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)'};
  backdrop-filter: blur(10px);
  box-shadow: ${props => props.$isDark 
    ? '0 4px 12px rgba(0, 0, 0, 0.3)'
    : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.$isDark 
      ? '0 8px 24px rgba(0, 0, 0, 0.4)'
      : '0 8px 24px rgba(0, 0, 0, 0.15)'};
    border-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.8)'};
  }
`;

const PulsingButton = styled(Button)<{ $isDark: boolean }>`
  animation: ${pulse} 2s infinite;
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255,255,255,0.1) 50%,
      transparent 100%
    );
    animation: ${shine} 3s linear infinite;
  }
`;

const HeroSection = styled.div<{ $isDark: boolean }>`
  padding: 120px 24px;
  text-align: center;
  background: ${props => props.$isDark 
    ? 'linear-gradient(135deg, rgba(13, 25, 42, 0.8) 0%, rgba(26, 54, 93, 0.8) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(236, 246, 255, 0.9) 100%)'};
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)'};
  box-shadow: ${props => props.$isDark 
    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
    : '0 8px 32px rgba(0, 0, 0, 0.1)'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$isDark 
      ? 'radial-gradient(circle at 30% 30%, rgba(25, 118, 210, 0.1) 0%, transparent 70%)'
      : 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 70%)'};
    pointer-events: none;
  }
`;

const AnimatedTitle = styled(Title)<{ $delay?: string }>`
  animation: ${slideIn} 1s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;
`;

const AnimatedParagraph = styled(Paragraph)<{ $delay?: string }>`
  animation: ${fadeIn} 1s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;
`;

const HeroImageWrapper = styled.div`
  animation: ${float} 6s ease-in-out infinite;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 20px;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%);
    filter: blur(5px);
  }
`;

const StyledHeroImage = styled(Image)`
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  animation: ${rotateIn} 1.5s ease-out;
  max-width: 100%;
  height: auto;
  
  &:hover {
    transform: scale(1.02) translateY(-5px);
    box-shadow: 0 25px 50px rgba(0,0,0,0.4);
  }
`;

const ActionButton = styled(Button)<{ $isDark: boolean }>`
  height: 44px;
  padding: 0 24px;
  font-size: 16px;
  border-radius: 8px;
  font-weight: 500;
  background: ${props => props.$isDark 
    ? 'linear-gradient(to right, #1976D2, #2196F3)'
    : 'linear-gradient(to right, #2196F3, #42A5F5)'};
  border: none;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(33, 150, 243, 0.3);
    background: ${props => props.$isDark 
      ? 'linear-gradient(to right, #1976D2, #2196F3)'
      : 'linear-gradient(to right, #2196F3, #42A5F5)'};
  }

  &.ghost {
    background: transparent;
    border: 2px solid ${props => props.$isDark ? '#1976D2' : '#2196F3'};
    color: ${props => props.$isDark ? '#1976D2' : '#2196F3'};
    box-shadow: none;

    &:hover {
      background: ${props => props.$isDark ? 'rgba(25, 118, 210, 0.1)' : 'rgba(33, 150, 243, 0.1)'};
      border-color: ${props => props.$isDark ? '#2196F3' : '#42A5F5'};
      color: ${props => props.$isDark ? '#2196F3' : '#42A5F5'};
    }
  }
`;

const TestimonialImage = styled(Image)`
  width: 80px !important;
  height: 80px !important;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
`;

const FeatureIcon = styled.div<{ $color: string; $isDark: boolean }>`
  font-size: 48px;
  margin-bottom: 20px;
  color: ${props => props.$color};
  transition: all 0.3s ease;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: scale(1.1) rotate(5deg);
  }
`;

const StatsCard = styled(Card)<{ $isDark: boolean }>`
  text-align: center;
  background: ${props => props.$isDark 
    ? 'linear-gradient(135deg, rgba(26, 32, 44, 0.8) 0%, rgba(45, 55, 72, 0.8) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 250, 252, 0.9) 100%)'};
  border: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)'};
  backdrop-filter: blur(10px);
  box-shadow: ${props => props.$isDark 
    ? '0 4px 12px rgba(0, 0, 0, 0.3)'
    : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: ${props => props.$isDark
      ? '0 8px 24px rgba(0, 0, 0, 0.4)'
      : '0 8px 24px rgba(0, 0, 0, 0.15)'};
    border-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.8)'};
  }
`;

const TestimonialCard = styled(Card)<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: 1px solid ${props => props.$isDark ? '#1f1f1f' : '#f0f0f0'};
  box-shadow: ${props => props.$isDark 
    ? '0 4px 12px rgba(0,0,0,0.6)'
    : '0 4px 12px rgba(0,0,0,0.1)'};
  transition: all 0.3s ease;
  
  .ant-carousel .slick-dots li button {
    background: ${props => props.$isDark ? '#333' : '#d9d9d9'};
  }
  
  .ant-carousel .slick-dots li.slick-active button {
    background: ${props => props.$isDark ? '#ffffff' : '#1890ff'};
  }

  .ant-card-body {
    background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const ThemeToggle = styled(Button)<{ $isDark: boolean }>`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1000;
  background: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  backdrop-filter: blur(10px);
  border: none;
  color: ${props => props.$isDark ? '#ffffff' : '#000000'};

  &:hover {
    background: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
    color: ${props => props.$isDark ? '#ffffff' : '#000000'};
  }
`;

const FooterSection = styled.footer<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#0a0a0a' : '#f5f5f5'};
  padding: 60px 0 20px;
  margin-top: 60px;
  border-top: 1px solid ${props => props.$isDark ? '#1f1f1f' : '#e8e8e8'};

  .ant-typography {
    color: ${props => props.$isDark ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.85)'};
  }

  .ant-typography-secondary {
    color: ${props => props.$isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)'};
  }

  .ant-btn-text {
    color: ${props => props.$isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)'};
    &:hover {
      color: #1890ff;
      background: ${props => props.$isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'};
    }
  }
`;

const FooterColumn = styled.div`
  margin-bottom: 24px;
`;

const StyledLink = styled(RouterLink)<{ $isDark: boolean }>`
  color: ${props => props.$isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)'};
  transition: color 0.3s ease;
  
  &:hover {
    color: #1890ff;
  }
`;

const Landing: React.FC = () => {
  const { mode, toggleTheme } = useThemeMode();
  const isDark = mode === 'dark';
  const { token } = useToken();

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#0a0a0a' : '#ffffff';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [isDark]);

  const features = [
    {
      icon: <UserOutlined />,
      title: 'Easy Appointments',
      description: 'Book appointments with doctors quickly and easily',
      color: '#1890ff'
    },
    {
      icon: <CalendarOutlined />,
      title: 'Schedule Management',
      description: 'Manage your medical appointments efficiently',
      color: '#52c41a'
    },
    {
      icon: <MessageOutlined />,
      title: 'Direct Communication',
      description: 'Chat directly with your healthcare providers',
      color: '#722ed1'
    },
    {
      icon: <HeartOutlined />,
      title: 'Health Tracking',
      description: 'Monitor your health progress over time',
      color: '#f5222d'
    }
  ];

  const testimonials = [
    {
      name: 'John Doe',
      role: 'Patient',
      content: 'This platform has made managing my healthcare so much easier. Highly recommended!',
      avatar: '/avatars/patient1.jpg'
    },
    {
      name: 'Dr. Sarah Wilson',
      role: 'Cardiologist',
      content: 'An excellent system that helps me stay connected with my patients effectively.',
      avatar: '/avatars/doctor1.jpg'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Patients Served' },
    { number: '500+', label: 'Doctors' },
    { number: '50,000+', label: 'Appointments' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  return (
    <PageWrapper $isDark={isDark}>
      <ThemeToggle
        $isDark={isDark}
        icon={<BgColorsOutlined />}
        onClick={toggleTheme}
        shape="circle"
        size="large"
      />

      <HeroSection $isDark={isDark}>
        <Container>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={12}>
              <AnimatedTitle level={1} $delay="0.2s">
                Your Health, Our Priority
              </AnimatedTitle>
              <AnimatedParagraph $delay="0.4s">
                Connect with top healthcare professionals from the comfort of your home.
                Schedule appointments, get consultations, and manage your health journey seamlessly.
              </AnimatedParagraph>
              <Space size="middle" style={{ marginTop: 32 }}>
                <ActionButton $isDark={isDark} size="large">
                  <RouterLink to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Get Started
                  </RouterLink>
                </ActionButton>
                <ActionButton $isDark={isDark} size="large" className="ghost">
                  <RouterLink to="/doctors" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Find Doctors
                  </RouterLink>
                </ActionButton>
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <HeroImageWrapper>
                <StyledHeroImage
                  src="https://img.freepik.com/free-vector/telemedicine-abstract-concept-vector-illustration_107173-25879.jpg"
                  alt="Healthcare Illustration"
                  preview={false}
                />
              </HeroImageWrapper>
            </Col>
          </Row>
        </Container>
      </HeroSection>

      <Container>
        {/* Features Section */}
        <AnimatedSection $delay="0.4s">
          <Row gutter={[32, 32]} style={{ marginBottom: 80 }}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <FloatingCard $isDark={isDark}>
                  <FeatureIcon $color={feature.color} $isDark={isDark}>
                    {feature.icon}
                  </FeatureIcon>
                  <Title level={4} style={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit' }}>
                    {feature.title}
                  </Title>
                  <Paragraph style={{ color: isDark ? 'rgba(255,255,255,0.65)' : 'inherit' }}>
                    {feature.description}
                  </Paragraph>
                </FloatingCard>
              </Col>
            ))}
          </Row>
        </AnimatedSection>

        {/* Stats Section */}
        <AnimatedSection $delay="0.5s">
          <Row gutter={[24, 24]} style={{ marginBottom: 80 }}>
            {stats.map((stat, index) => (
              <Col xs={12} md={6} key={index}>
                <StatsCard $isDark={isDark}>
                  <Title level={2} style={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit', margin: 0 }}>
                    {stat.number}
                  </Title>
                  <Paragraph style={{ color: isDark ? 'rgba(255,255,255,0.65)' : 'inherit', margin: 0 }}>
                    {stat.label}
                  </Paragraph>
                </StatsCard>
              </Col>
            ))}
          </Row>
        </AnimatedSection>

        {/* Testimonials Section */}
        <AnimatedSection $delay="0.6s">
          <TestimonialCard $isDark={isDark}>
            <Carousel autoplay>
              {testimonials.map((testimonial, index) => (
                <div key={index} style={{ padding: '40px 20px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <TestimonialImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <Title level={4} style={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit' }}>
                      {testimonial.name}
                    </Title>
                    <Paragraph style={{ color: isDark ? 'rgba(255,255,255,0.65)' : 'inherit' }}>
                      {testimonial.role}
                    </Paragraph>
                    <Paragraph style={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit' }}>
                      "{testimonial.content}"
                    </Paragraph>
                  </div>
                </div>
              ))}
            </Carousel>
          </TestimonialCard>
        </AnimatedSection>
      </Container>

      <FooterSection $isDark={isDark}>
        <Container>
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={12} md={6}>
              <FooterColumn>
                <Typography.Title level={4}>HealthCare</Typography.Title>
                <Typography.Paragraph type="secondary">
                  Your trusted healthcare platform connecting patients with qualified medical professionals.
                </Typography.Paragraph>
                <Space>
                  <Button type="text" icon={<FacebookOutlined />} />
                  <Button type="text" icon={<TwitterOutlined />} />
                  <Button type="text" icon={<LinkedinOutlined />} />
                  <Button type="text" icon={<InstagramOutlined />} />
                </Space>
              </FooterColumn>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <FooterColumn>
                <Typography.Title level={4}>Quick Links</Typography.Title>
                <List
                  itemLayout="vertical"
                  split={false}
                  dataSource={[
                    { title: 'Find Doctors', link: '/doctors' },
                    { title: 'Book Appointment', link: '/appointments' },
                    { title: 'Our Services', link: '/services' },
                    { title: 'Health Blog', link: '/blog' },
                  ]}
                  renderItem={item => (
                    <List.Item style={{ padding: '4px 0' }}>
                      <StyledLink to={item.link} $isDark={isDark}>
                        {item.title}
                      </StyledLink>
                    </List.Item>
                  )}
                />
              </FooterColumn>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <FooterColumn>
                <Typography.Title level={4}>Support</Typography.Title>
                <List
                  itemLayout="vertical"
                  split={false}
                  dataSource={[
                    { title: 'Help Center', link: '/help' },
                    { title: 'FAQs', link: '/faqs' },
                    { title: 'Privacy Policy', link: '/privacy' },
                    { title: 'Terms of Service', link: '/terms' },
                  ]}
                  renderItem={item => (
                    <List.Item style={{ padding: '4px 0' }}>
                      <StyledLink to={item.link} $isDark={isDark}>
                        {item.title}
                      </StyledLink>
                    </List.Item>
                  )}
                />
              </FooterColumn>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <FooterColumn>
                <Typography.Title level={4}>Contact Us</Typography.Title>
                <List
                  itemLayout="vertical"
                  split={false}
                  dataSource={[
                    { icon: <EnvironmentOutlined />, text: '123 Healthcare Ave, Medical City, MC 12345' },
                    { icon: <PhoneOutlined />, text: '+1 (555) 123-4567' },
                    { icon: <MailOutlined />, text: 'support@healthcare.com' },
                    { icon: <ClockCircleOutlined />, text: 'Mon - Fri: 9:00 AM - 6:00 PM' },
                  ]}
                  renderItem={item => (
                    <List.Item style={{ padding: '4px 0' }}>
                      <Space>
                        {item.icon}
                        <Typography.Text type="secondary">{item.text}</Typography.Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </FooterColumn>
            </Col>
          </Row>

          <Divider style={{ margin: '24px 0' }} />

          <Row justify="center">
            <Col>
              <Typography.Text type="secondary">
                © {new Date().getFullYear()} HealthCare. All rights reserved.
              </Typography.Text>
            </Col>
          </Row>
        </Container>
      </FooterSection>
    </PageWrapper>
  );
};

export default Landing;
