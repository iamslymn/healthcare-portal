import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Button,
  IconButton,
  LinearProgress,
  Card,
  CardContent,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Popover,
  Divider,
} from '@mui/material';
import {
  Today as TodayIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  VideoCall as VideoCallIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  Star as StarIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import styled from '@emotion/styled';
import { useThemeMode } from '../../App';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface StyledProps {
  $isDark: boolean;
}

const StyledCard = styled(Card)<StyledProps>(({ $isDark }) => ({
  background: $isDark ? '#1f1f1f' : '#ffffff',
  border: `1px solid ${$isDark ? '#303030' : '#f0f0f0'}`,
  transition: 'all 0.3s ease',

  '.MuiCardContent-root': {
    color: $isDark ? 'rgba(255,255,255,0.85)' : 'inherit'
  }
}));

const StyledPaper = styled(Paper)<StyledProps>(({ $isDark }) => ({
  background: $isDark ? '#1f1f1f' : '#ffffff',
  border: `1px solid ${$isDark ? '#303030' : '#f0f0f0'}`,
  transition: 'all 0.3s ease',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: $isDark 
      ? '0 8px 16px rgba(0,0,0,0.4)' 
      : '0 8px 16px rgba(0,0,0,0.1)'
  }
}));

const StyledListItem = styled(ListItem)<StyledProps>(({ $isDark }) => ({
  borderBottom: `1px solid ${$isDark ? '#303030' : '#f0f0f0'}`,
  
  '&:hover': {
    background: $isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
  },

  '.MuiTypography-root': {
    color: $isDark ? 'rgba(255,255,255,0.85)' : 'inherit'
  },

  '.MuiTypography-secondary': {
    color: $isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.6)'
  }
}));

const StyledTabs = styled(Tabs)<StyledProps>(({ $isDark }) => ({
  borderBottom: `1px solid ${$isDark ? '#303030' : '#f0f0f0'}`,
  
  '.MuiTab-root': {
    color: $isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.6)',
    
    '&.Mui-selected': {
      color: $isDark ? '#1976d2' : '#1976d2'
    }
  }
}));

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const StyledPopover = styled(Popover)<StyledProps>`
  .MuiPopover-paper {
    background: ${props => props.$isDark ? '#1f1f1f' : '#ffffff'};
    border: 1px solid ${props => props.$isDark ? '#303030' : '#f0f0f0'};
    transition: all 0.3s ease;
  }
`;

const DoctorDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data - replace with API calls
  const upcomingAppointments = [
    {
      id: 1,
      patientName: 'John Doe',
      time: '10:00 AM',
      date: '2024-02-10',
      status: 'confirmed',
      type: 'video',
      avatar: '/avatars/patient1.jpg',
      reason: 'Follow-up consultation',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      time: '11:30 AM',
      date: '2024-02-10',
      status: 'pending',
      type: 'in-person',
      avatar: '/avatars/patient2.jpg',
      reason: 'Annual check-up',
    },
  ];

  const statistics = [
    {
      title: "Today's Appointments",
      value: 8,
      icon: <TodayIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Pending Requests',
      value: 3,
      icon: <ScheduleIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.warning.main,
    },
    {
      title: 'Total Patients',
      value: 145,
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.success.main,
    },
    {
      title: 'Revenue',
      value: '$1,250',
      icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.info.main,
    },
  ];

  const performanceMetrics = [
    { label: 'Patient Satisfaction', value: 92 },
    { label: 'Appointment Completion Rate', value: 88 },
    { label: 'Response Time', value: 95 },
  ];

  const handleStartCall = () => {
    // Navigate to video consultation page
    navigate('/consultations');
  };

  const handleSchedule = () => {
    // Navigate to appointments page
    navigate('/appointments');
  };

  const handleApprove = () => {
    setIsApproveDialogOpen(true);
  };

  const handleCancel = () => {
    setIsCancelDialogOpen(true);
  };

  const confirmApprove = () => {
    // TODO: Implement appointment approval logic
    console.log('Appointment approved');
    setIsApproveDialogOpen(false);
  };

  const confirmCancel = () => {
    // TODO: Implement appointment cancellation logic
    console.log('Appointment cancelled');
    setIsCancelDialogOpen(false);
  };

  return (
    <Grid container spacing={3}>
      {/* Statistics Cards */}
      {statistics.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StyledPaper
            $isDark={isDark}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              background: isDark 
                ? `linear-gradient(135deg, ${stat.color}15, rgba(31,31,31,0.9))`
                : `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
              borderColor: isDark ? `${stat.color}30` : `${stat.color}30`,
            }}
          >
            <Box sx={{ color: stat.color, mb: 1 }}>{stat.icon}</Box>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 1, 
                color: isDark ? stat.color : stat.color 
              }}
            >
              {stat.value}
            </Typography>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: isDark ? 'rgba(255,255,255,0.45)' : 'text.secondary' 
              }}
            >
              {stat.title}
            </Typography>
          </StyledPaper>
        </Grid>
      ))}

      {/* Performance Metrics */}
      <Grid item xs={12} md={4}>
        <StyledCard $isDark={isDark}>
          <CardContent>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit'
              }}
            >
              <TrendingUpIcon color="primary" />
              Performance Metrics
            </Typography>
            <Box sx={{ mt: 2 }}>
              {performanceMetrics.map((metric, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'text.secondary' }}
                    >
                      {metric.label}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="primary"
                    >
                      {metric.value}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={metric.value}
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : undefined
                    }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </StyledCard>
      </Grid>

      {/* Rating Card */}
      <Grid item xs={12} md={4}>
        <StyledCard $isDark={isDark}>
          <CardContent>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit'
              }}
            >
              <StarIcon color="primary" />
              Overall Rating
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <Typography 
                variant="h3" 
                color="primary"
              >
                4.8
              </Typography>
              <Box>
                <Box sx={{ display: 'flex', color: theme.palette.warning.main }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} />
                  ))}
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'text.secondary' }}
                >
                  Based on 128 reviews
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </StyledCard>
      </Grid>

      {/* Quick Actions */}
      <Grid item xs={12} md={4}>
        <StyledCard $isDark={isDark}>
          <CardContent>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit' }}
            >
              Quick Actions
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<VideoCallIcon />}
                  onClick={handleStartCall}
                  sx={{
                    height: '100%',
                    minHeight: 80,
                    backgroundColor: isDark ? 'rgba(25,118,210,0.15)' : undefined,
                    '&:hover': {
                      backgroundColor: isDark ? 'rgba(25,118,210,0.25)' : undefined,
                    }
                  }}
                >
                  Start Video Call
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  startIcon={<ScheduleIcon />}
                  onClick={handleSchedule}
                  sx={{
                    height: '100%',
                    minHeight: 80,
                    borderColor: isDark ? 'rgba(25,118,210,0.5)' : undefined,
                    color: isDark ? '#1976d2' : undefined,
                    '&:hover': {
                      borderColor: isDark ? 'rgba(25,118,210,0.7)' : undefined,
                      backgroundColor: isDark ? 'rgba(25,118,210,0.08)' : undefined,
                    }
                  }}
                >
                  Schedule
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </StyledCard>
      </Grid>

      {/* Appointments Section */}
      <Grid item xs={12}>
        <StyledCard $isDark={isDark}>
          <CardContent>
            <StyledTabs $isDark={isDark} value={tabValue} onChange={handleTabChange}>
              <Tab label="Today's Appointments" />
              <Tab label="Upcoming Appointments" />
              <Tab label="Past Appointments" />
            </StyledTabs>

            <TabPanel value={tabValue} index={0}>
              <List>
                {upcomingAppointments.map((appointment) => (
                  <StyledListItem $isDark={isDark} key={appointment.id}>
                    <ListItemAvatar>
                      <Avatar src={appointment.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={appointment.patientName}
                      secondary={`${appointment.time} - ${appointment.reason}`}
                    />
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Chip
                        label={appointment.status}
                        color={appointment.status === 'confirmed' ? 'success' : 'warning'}
                        size="small"
                        sx={{
                          backgroundColor: isDark 
                            ? appointment.status === 'confirmed' 
                              ? 'rgba(76,175,80,0.15)' 
                              : 'rgba(255,152,0,0.15)'
                            : undefined,
                          color: isDark
                            ? appointment.status === 'confirmed'
                              ? '#4caf50'
                              : '#ff9800'
                            : undefined
                        }}
                      />
                      {appointment.type === 'video' && (
                        <IconButton
                          color="primary"
                          onClick={handleStartCall}
                          sx={{
                            color: isDark ? '#1976d2' : undefined,
                            '&:hover': {
                              backgroundColor: isDark ? 'rgba(25,118,210,0.08)' : undefined
                            }
                          }}
                        >
                          <VideoCallIcon />
                        </IconButton>
                      )}
                      {appointment.status === 'pending' && (
                        <>
                          <IconButton
                            color="success"
                            onClick={handleApprove}
                            sx={{
                              color: isDark ? '#4caf50' : undefined,
                              '&:hover': {
                                backgroundColor: isDark ? 'rgba(76,175,80,0.08)' : undefined
                              }
                            }}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={handleCancel}
                            sx={{
                              color: isDark ? '#f44336' : undefined,
                              '&:hover': {
                                backgroundColor: isDark ? 'rgba(244,67,54,0.08)' : undefined
                              }
                            }}
                          >
                            <CancelIcon />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  </StyledListItem>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography 
                sx={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'text.secondary' }}
              >
                No upcoming appointments
              </Typography>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography 
                sx={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'text.secondary' }}
              >
                No past appointments
              </Typography>
            </TabPanel>
          </CardContent>
        </StyledCard>
      </Grid>

      {/* Dialogs */}
      <Dialog open={isApproveDialogOpen} onClose={() => setIsApproveDialogOpen(false)}>
        <DialogTitle>Confirm Appointment</DialogTitle>
        <DialogContent>
          Are you sure you want to approve this appointment?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsApproveDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmApprove} variant="contained" color="primary">
            Approve
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isCancelDialogOpen} onClose={() => setIsCancelDialogOpen(false)}>
        <DialogTitle>Cancel Appointment</DialogTitle>
        <DialogContent>
          Are you sure you want to cancel this appointment?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCancelDialogOpen(false)}>No</Button>
          <Button onClick={confirmCancel} variant="contained" color="error">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default DoctorDashboard; 