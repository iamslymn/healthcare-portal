import { useState, useRef } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Box,
  Button,
  TextField,
  Divider,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Tab,
  Tabs,
  IconButton,
  Alert,
  Badge,
  Snackbar,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateUser } from '../store/slices/authSlice';
import { useThemeMode } from '../App';
import api from '../api/axios';

const StyledPaper = styled(Paper)<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#1a1a1a' : '#ffffff'};
  border: 1px solid ${props => props.$isDark ? '#333333' : 'rgba(0, 0, 0, 0.12)'};
  color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
  transition: all 0.3s ease;

  .MuiTypography-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.95)' : 'inherit'};
  }

  .MuiTypography-colorTextSecondary {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
  }

  .MuiIconButton-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)'};
    &:hover {
      color: ${props => props.$isDark ? '#ffffff' : 'rgba(0, 0, 0, 0.87)'};
    }
  }

  .MuiDivider-root {
    border-color: ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.12)'};
  }
`;

const StyledTextField = styled(TextField)<{ $isDark: boolean }>`
  .MuiOutlinedInput-root {
    background-color: ${props => props.$isDark ? '#141414' : '#ffffff'};
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.95)' : 'inherit'};
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.$isDark ? '#404040' : 'rgba(0, 0, 0, 0.23)'};
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.$isDark ? '#1976d2' : '#1976d2'};
    }
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.23)'};
  }
  .MuiInputLabel-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.7)' : undefined};
    &.Mui-focused {
      color: ${props => props.$isDark ? '#1976d2' : '#1976d2'};
    }
  }
`;

const StyledTabs = styled(Tabs)<{ $isDark: boolean }>`
  .MuiTab-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.7)' : undefined};
    &.Mui-selected {
      color: ${props => props.$isDark ? '#1976d2' : undefined};
    }
  }
  .MuiTabs-indicator {
    background-color: ${props => props.$isDark ? '#1976d2' : undefined};
  }
`;

const StyledListItem = styled(ListItem)<{ $isDark: boolean }>`
  &:hover {
    background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.02)'};
  }
  .MuiListItemIcon-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.7)' : undefined};
  }
  .MuiListItemText-primary {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.95)' : 'inherit'};
  }
  .MuiListItemText-secondary {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
  }
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Profile = () => {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const [tabValue, setTabValue] = useState(0);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    soundNotifications: true,
    twoFactorAuth: false,
    language: 'English',
    privacy: 'public',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('profilePicture', file);

        const response = await api.post('/users/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          setProfilePicture(response.data.profilePictureUrl);
          dispatch(updateUser({
            ...user!,
            profilePicture: response.data.profilePictureUrl
          }));
          setSuccessMessage('Profile picture updated successfully');
        } else {
          throw new Error(response.data.message || 'Failed to update profile picture');
        }
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || 'Failed to update profile picture');
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Add your save changes logic here
      const response = await api.put('/users/profile', {
        // Add the fields you want to update
        profilePicture,
        // Add other profile fields
      });

      setSuccessMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      setErrorMessage('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Summary */}
        <Grid item xs={12} md={4}>
          <StyledPaper $isDark={isDark} sx={{ p: 3, textAlign: 'center' }}>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleProfilePictureUpload}
            />
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <IconButton
                  sx={{
                    bgcolor: isDark ? 'rgba(25, 118, 210, 0.2)' : 'primary.main',
                    color: isDark ? '#1976d2' : 'white',
                    '&:hover': {
                      bgcolor: isDark ? 'rgba(25, 118, 210, 0.3)' : 'primary.dark',
                    },
                    width: 32,
                    height: 32,
                  }}
                  onClick={handleProfilePictureClick}
                >
                  <PhotoCameraIcon sx={{ fontSize: 18 }} />
                </IconButton>
              }
            >
              <Avatar
                src={profilePicture || user?.profilePicture}
                alt={user?.firstName}
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto 16px',
                  bgcolor: isDark ? 'rgba(25, 118, 210, 0.2)' : 'primary.main',
                  color: isDark ? '#1976d2' : 'white',
                  cursor: 'pointer',
                  border: `3px solid ${isDark ? '#333333' : '#f0f0f0'}`,
                  boxShadow: `0 4px 12px ${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'}`,
                }}
                onClick={handleProfilePictureClick}
              >
                {!profilePicture && user?.firstName?.[0]}{!profilePicture && user?.lastName?.[0]}
              </Avatar>
            </Badge>
            <Typography variant="h5" gutterBottom>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {user?.email}
            </Typography>
            <Button
              variant="outlined"
              startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
              onClick={() => setIsEditing(!isEditing)}
              sx={{
                mt: 2,
                borderColor: isDark ? '#303030' : undefined,
                color: isDark ? 'rgba(255, 255, 255, 0.85)' : undefined,
                '&:hover': {
                  borderColor: isDark ? '#1976d2' : undefined,
                  backgroundColor: isDark ? 'rgba(25, 118, 210, 0.08)' : undefined,
                },
              }}
            >
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </Button>
          </StyledPaper>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <StyledPaper $isDark={isDark} sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <StyledTabs 
                value={tabValue} 
                onChange={handleTabChange} 
                $isDark={isDark}
                aria-label="profile tabs"
              >
                <Tab label="Personal Info" id="profile-tab-0" />
                <Tab label="Settings" id="profile-tab-1" />
                <Tab label="Security" id="profile-tab-2" />
              </StyledTabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    $isDark={isDark}
                    fullWidth
                    label="First Name"
                    defaultValue={user?.firstName}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    $isDark={isDark}
                    fullWidth
                    label="Last Name"
                    defaultValue={user?.lastName}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    $isDark={isDark}
                    fullWidth
                    label="Email"
                    defaultValue={user?.email}
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <List>
                <StyledListItem $isDark={isDark}>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive email notifications for appointments and updates"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.emailNotifications}
                      onChange={() => handleSettingChange('emailNotifications')}
                    />
                  </ListItemSecondaryAction>
                </StyledListItem>
                <Divider />
                <StyledListItem $isDark={isDark}>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="SMS Notifications"
                    secondary="Receive SMS notifications for appointments and updates"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.smsNotifications}
                      onChange={() => handleSettingChange('smsNotifications')}
                    />
                  </ListItemSecondaryAction>
                </StyledListItem>
                <Divider />
                <StyledListItem $isDark={isDark}>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sound Notifications"
                    secondary="Play sound for notifications"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.soundNotifications}
                      onChange={() => handleSettingChange('soundNotifications')}
                    />
                  </ListItemSecondaryAction>
                </StyledListItem>
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <List>
                <StyledListItem $isDark={isDark}>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Two-Factor Authentication"
                    secondary="Add an extra layer of security to your account"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.twoFactorAuth}
                      onChange={() => handleSettingChange('twoFactorAuth')}
                    />
                  </ListItemSecondaryAction>
                </StyledListItem>
                <Divider />
                <StyledListItem $isDark={isDark}>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Change Password"
                    secondary="Update your account password"
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: isDark ? '#303030' : undefined,
                        color: isDark ? 'rgba(255, 255, 255, 0.85)' : undefined,
                        '&:hover': {
                          borderColor: isDark ? '#1976d2' : undefined,
                          backgroundColor: isDark ? 'rgba(25, 118, 210, 0.08)' : undefined,
                        },
                      }}
                    >
                      Change
                    </Button>
                  </ListItemSecondaryAction>
                </StyledListItem>
              </List>
            </TabPanel>
          </StyledPaper>
        </Grid>
      </Grid>

      {isEditing && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          mt: 3,
          gap: 2
        }}>
          <Button 
            variant="outlined" 
            onClick={() => setIsEditing(false)}
            sx={{
              color: isDark ? 'rgba(255,255,255,0.85)' : undefined,
              borderColor: isDark ? 'rgba(255,255,255,0.23)' : undefined,
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveChanges}
            sx={{
              bgcolor: isDark ? '#2196f3' : undefined,
              '&:hover': {
                bgcolor: isDark ? '#1976d2' : undefined,
              }
            }}
          >
            Save Changes
          </Button>
        </Box>
      )}

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
      >
        <Alert 
          onClose={() => setSuccessMessage(null)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
      >
        <Alert 
          onClose={() => setErrorMessage(null)} 
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile; 