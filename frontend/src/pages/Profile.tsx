import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { updateUser } from '../store/slices/authSlice';
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Tabs,
  Tab,
  Paper,
  Divider,
  IconButton,
  Badge,
  Snackbar,
  Alert,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Edit as EditIcon,
  PhotoCamera,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useThemeMode } from '../App';
import api from '../services/api';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: 24,
  marginBottom: 24,
  backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#333333' : '#e0e0e0'}`,
  color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.87)',
  boxShadow: theme.palette.mode === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: 8,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.mode === 'dark' ? '#2a2a2a' : '#ffffff',
    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.87)',
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.mode === 'dark' ? '#444444' : '#e0e0e0',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.mode === 'dark' ? '#666666' : '#b0b0b0',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
  },
  '& .MuiTab-root': {
    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
    '&.Mui-selected': {
      color: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
    },
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#333333' : '#f0f0f0'}`,
  '& .MuiListItemIcon-root': {
    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)',
  },
  '& .MuiTypography-colorTextSecondary': {
    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
  },
}));

// Tab Panel component
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
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    // Doctor profile fields
    specialty: user?.specialty || '',
    education: user?.education || '',
    experience: user?.experience || 0,
    location: user?.location || '',
    consultationFee: user?.consultationFee ? parseInt(user?.consultationFee.replace('$', '') || '0') : 0,
    languages: user?.languages || [],
    availability: user?.availability || '',
    about: user?.about || '',
  });
  
  // Settings state
  const [settings, setSettings] = useState({
    language: 'English',
    theme: mode,
    notifications: 'All',
    privacy: 'Public',
  });
  
  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        // Doctor profile fields
        specialty: user.specialty || '',
        education: user.education || '',
        experience: user.experience || 0,
        location: user.location || '',
        consultationFee: user.consultationFee ? parseInt(user.consultationFee.replace('$', '') || '0') : 0,
        languages: user.languages || [],
        availability: user.availability || '',
        about: user.about || '',
      });
      setProfilePicture(user.profilePicture || '');
    }
  }, [user]);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('profilePicture', file);
    
    try {
      const response = await api.post('/users/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        setProfilePicture(response.data.profilePictureUrl);
        dispatch(updateUser({ ...user!, profilePicture: response.data.profilePictureUrl }));
        setSuccessMessage('Profile picture updated successfully');
      } else {
        throw new Error(response.data.message || 'Failed to upload profile picture');
      }
    } catch (error: any) {
      console.error('Error uploading profile picture:', error);
      setErrorMessage(error.message || 'Failed to upload profile picture');
    }
  };
  
  const handleSettingChange = (setting: keyof typeof settings) => (event: React.ChangeEvent<{ value: unknown }>) => {
    setSettings({
      ...settings,
      [setting]: event.target.value,
    });
  };
  
  const handleSaveProfile = async () => {
    try {
      // Format the values for doctor profiles
      let updatedData = { ...formData };
      
      if (user?.role === 'doctor' && formData.consultationFee) {
        updatedData.consultationFee = `$${formData.consultationFee}`;
      }
      
      // Update the user profile
      await dispatch(updateUser(updatedData));
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setErrorMessage(error.message || 'Failed to update profile. Please try again.');
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = e.target.name as string;
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <IconButton
                  sx={{
                    bgcolor: isDark ? '#2196f3' : '#1976d2',
                    color: '#fff',
                    '&:hover': {
                      bgcolor: isDark ? '#1976d2' : '#1565c0',
                    },
                    width: 32,
                    height: 32,
                  }}
                  onClick={handleProfilePictureClick}
                >
                  <PhotoCamera sx={{ fontSize: 16 }} />
                </IconButton>
              }
            >
              <Avatar
                src={profilePicture || '/avatars/default-avatar.png'}
                sx={{
                  width: 120,
                  height: 120,
                  border: isDark ? '4px solid #333' : '4px solid #f0f0f0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                }}
                onClick={handleProfilePictureClick}
              />
            </Badge>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleProfilePictureUpload}
            />
            <Box sx={{ ml: 3 }}>
              <Typography variant="h4" gutterBottom>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {user?.email}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: 'inline-block',
                  bgcolor: user?.role === 'doctor' ? '#4caf50' : '#2196f3',
                  color: '#fff',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  mt: 1,
                  textTransform: 'capitalize',
                }}
              >
                {user?.role}
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <StyledPaper>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <StyledTabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="profile tabs"
              >
                <Tab label="Personal Information" id="profile-tab-0" />
                <Tab label="Security" id="profile-tab-1" />
                <Tab label="Notifications" id="profile-tab-2" />
                <Tab label="Privacy" id="profile-tab-3" />
              </StyledTabs>
            </Box>
            
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Grid>
                
                {/* Doctor profile fields */}
                {user?.role === 'doctor' && (
                  <>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        Professional Information
                      </Typography>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        Complete your professional profile to be visible in the Find Doctors section.
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth disabled={!isEditing}>
                        <InputLabel>Specialty</InputLabel>
                        <Select
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleSelectChange as any}
                          label="Specialty"
                        >
                          <MenuItem value="Cardiology">Cardiology</MenuItem>
                          <MenuItem value="Dermatology">Dermatology</MenuItem>
                          <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                          <MenuItem value="Orthopedics">Orthopedics</MenuItem>
                          <MenuItem value="Neurology">Neurology</MenuItem>
                          <MenuItem value="Psychiatry">Psychiatry</MenuItem>
                          <MenuItem value="General Medicine">General Medicine</MenuItem>
                          <MenuItem value="Family Medicine">Family Medicine</MenuItem>
                          <MenuItem value="Internal Medicine">Internal Medicine</MenuItem>
                          <MenuItem value="Obstetrics & Gynecology">Obstetrics & Gynecology</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        fullWidth
                        label="Education"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="MD - Cardiology, MBBS"
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        fullWidth
                        label="Years of Experience"
                        name="experience"
                        type="number"
                        value={formData.experience}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        InputProps={{ inputProps: { min: 0, max: 50 } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        fullWidth
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="City, State"
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        fullWidth
                        label="Consultation Fee ($)"
                        name="consultationFee"
                        type="number"
                        value={formData.consultationFee}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        InputProps={{ inputProps: { min: 0 } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth disabled={!isEditing}>
                        <InputLabel>Availability</InputLabel>
                        <Select
                          name="availability"
                          value={formData.availability}
                          onChange={handleSelectChange as any}
                          label="Availability"
                        >
                          <MenuItem value="Available today">Available today</MenuItem>
                          <MenuItem value="Available tomorrow">Available tomorrow</MenuItem>
                          <MenuItem value="Available in 2 days">Available in 2 days</MenuItem>
                          <MenuItem value="Available in 3 days">Available in 3 days</MenuItem>
                          <MenuItem value="Available next week">Available next week</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="About"
                        name="about"
                        value={formData.about}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        multiline
                        rows={4}
                        placeholder="Describe your practice, specializations, and approach to patient care"
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                {isEditing ? (
                  <>
                    <Button 
                      variant="outlined" 
                      onClick={() => setIsEditing(false)} 
                      sx={{ mr: 2 }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<EditIcon />} 
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <List>
                <StyledListItem>
                  <ListItemIcon>
                    <LockIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Password"
                    secondary="Last changed 3 months ago"
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
                <Divider />
                <StyledListItem>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Two-Factor Authentication"
                    secondary="Disabled"
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
                      Enable
                    </Button>
                  </ListItemSecondaryAction>
                </StyledListItem>
              </List>
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              <List>
                <StyledListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email Notifications"
                    secondary={settings.notifications}
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
            
            <TabPanel value={tabValue} index={3}>
              <List>
                <StyledListItem>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Language"
                    secondary={settings.language}
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
                <Divider />
                <StyledListItem>
                  <ListItemIcon>
                    <PaletteIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Privacy"
                    secondary={settings.privacy}
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
      
      <Snackbar 
        open={!!successMessage} 
        autoHideDuration={6000} 
        onClose={() => setSuccessMessage('')}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={!!errorMessage} 
        autoHideDuration={6000} 
        onClose={() => setErrorMessage('')}
      >
        <Alert onClose={() => setErrorMessage('')} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile; 