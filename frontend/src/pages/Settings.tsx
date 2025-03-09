import { useState } from 'react';
import { Card, Typography, List, Switch, Button, Divider, Alert, Select, Space, Row, Col, message } from 'antd';
import {
  BellOutlined,
  SafetyCertificateOutlined,
  GlobalOutlined,
  BgColorsOutlined,
  SoundOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useThemeMode } from '../App';
import styled from '@emotion/styled';
import api from '../api/axios';

const { Title, Text } = Typography;
const { Option } = Select;

const StyledCard = styled(Card)<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: 1px solid ${props => props.$isDark ? '#303030' : '#f0f0f0'};
  
  .ant-list-item {
    border-bottom: 1px solid ${props => props.$isDark ? '#303030' : '#f0f0f0'};
  }
  
  .ant-typography {
    color: ${props => props.$isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)'};
  }
  
  .ant-typography-secondary {
    color: ${props => props.$isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'};
  }
`;

const Settings = () => {
  const { mode, toggleTheme } = useThemeMode();
  const isDark = mode === 'dark';
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    soundNotifications: true,
    twoFactorAuth: false,
    language: 'English',
    privacy: 'public',
  });

  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];
  const privacyOptions = ['public', 'private', 'friends'];

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => {
      const newSettings = {
        ...prev,
        [setting]: !prev[setting as keyof typeof settings],
      };
      setHasChanges(true);
      return newSettings;
    });
  };

  const handleSelectChange = (setting: string, value: string) => {
    setSettings(prev => {
      const newSettings = {
        ...prev,
        [setting]: value,
      };
      setHasChanges(true);
      return newSettings;
    });
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const response = await api.put('/users/settings', settings);
      message.success('Settings saved successfully');
      setHasChanges(false);
    } catch (error) {
      message.error('Failed to save settings');
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset settings to original values
    // You might want to fetch the current settings from the backend here
    setHasChanges(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: '24px auto', padding: '0 24px' }}>
      {hasChanges && (
        <div style={{ 
          position: 'fixed',
          bottom: 24,
          right: 24,
          display: 'flex',
          gap: 8,
          background: isDark ? 'rgba(26, 26, 26, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          padding: '16px 24px',
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${isDark ? '#333333' : '#e0e0e0'}`,
          zIndex: 1000,
        }}>
          <Button 
            onClick={handleCancel}
            style={{
              color: isDark ? 'rgba(255, 255, 255, 0.65)' : undefined,
            }}
          >
            Cancel
          </Button>
          <Button 
            type="primary"
            onClick={handleSaveChanges}
            loading={isSaving}
            style={{
              backgroundColor: isDark ? '#2196f3' : undefined,
            }}
          >
            Save Changes
          </Button>
        </div>
      )}

      <StyledCard $isDark={isDark}>
        <Title level={4}>Settings</Title>

        <List
          itemLayout="horizontal"
          split={false}
        >
          {/* Notifications Section */}
          <List.Item>
            <Title level={5}>Notifications</Title>
          </List.Item>
          
          <List.Item
            actions={[
              <Switch
                checked={settings.emailNotifications}
                onChange={() => handleSettingChange('emailNotifications')}
              />
            ]}
          >
            <List.Item.Meta
              avatar={<BellOutlined />}
              title="Email Notifications"
              description="Receive email notifications for appointments and updates"
            />
          </List.Item>

          <List.Item
            actions={[
              <Switch
                checked={settings.smsNotifications}
                onChange={() => handleSettingChange('smsNotifications')}
              />
            ]}
          >
            <List.Item.Meta
              avatar={<BellOutlined />}
              title="SMS Notifications"
              description="Receive SMS notifications for appointments and updates"
            />
          </List.Item>

          <List.Item
            actions={[
              <Switch
                checked={settings.soundNotifications}
                onChange={() => handleSettingChange('soundNotifications')}
              />
            ]}
          >
            <List.Item.Meta
              avatar={<SoundOutlined />}
              title="Sound Notifications"
              description="Play sound for notifications"
            />
          </List.Item>

          <Divider />

          {/* Appearance Section */}
          <List.Item>
            <Title level={5}>Appearance</Title>
          </List.Item>

          <List.Item
            actions={[
              <Switch
                checked={mode === 'dark'}
                onChange={toggleTheme}
              />
            ]}
          >
            <List.Item.Meta
              avatar={<BgColorsOutlined />}
              title="Dark Mode"
              description="Enable dark mode for better visibility in low light"
            />
          </List.Item>

          <Divider />

          {/* Privacy & Security Section */}
          <List.Item>
            <Title level={5}>Privacy & Security</Title>
          </List.Item>

          <List.Item
            actions={[
              <Switch
                checked={settings.twoFactorAuth}
                onChange={() => handleSettingChange('twoFactorAuth')}
              />
            ]}
          >
            <List.Item.Meta
              avatar={<SafetyCertificateOutlined />}
              title="Two-Factor Authentication"
              description="Enable two-factor authentication for enhanced security"
            />
          </List.Item>

          <List.Item
            actions={[
              <Select
                value={settings.privacy}
                onChange={(value) => handleSelectChange('privacy', value)}
                style={{ width: 120 }}
              >
                {privacyOptions.map((option) => (
                  <Option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Option>
                ))}
              </Select>
            ]}
          >
            <List.Item.Meta
              avatar={<EyeOutlined />}
              title="Profile Privacy"
              description="Control who can see your profile"
            />
          </List.Item>

          <Divider />

          {/* Preferences Section */}
          <List.Item>
            <Title level={5}>Preferences</Title>
          </List.Item>

          <List.Item
            actions={[
              <Select
                value={settings.language}
                onChange={(value) => handleSelectChange('language', value)}
                style={{ width: 120 }}
              >
                {languages.map((lang) => (
                  <Option key={lang} value={lang}>
                    {lang}
                  </Option>
                ))}
              </Select>
            ]}
          >
            <List.Item.Meta
              avatar={<GlobalOutlined />}
              title="Language"
              description="Select your preferred language"
            />
          </List.Item>
        </List>
      </StyledCard>
    </div>
  );
};

export default Settings; 