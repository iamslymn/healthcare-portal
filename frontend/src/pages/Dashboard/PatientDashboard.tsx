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
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  useTheme,
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  LocalHospital as HospitalIcon,
  VideoCall as VideoCallIcon,
  History as HistoryIcon,
  Favorite as FavoriteIcon,
  Assignment as AssignmentIcon,
  LocalPharmacy as PharmacyIcon,
  Timeline as TimelineIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useThemeMode } from '../../App';
import styled from '@emotion/styled';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StyledCard = styled(Card)<{ $isDark: boolean }>`
  height: 100%;
  background: ${props => props.$isDark ? '#1f1f1f' : '#ffffff'};
  border: 1px solid ${props => props.$isDark ? '#303030' : '#f0f0f0'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.$isDark 
      ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
      : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  }
`;

const StyledPaper = styled(Paper)<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: 1px solid ${props => props.$isDark ? '#303030' : '#f0f0f0'};
`;

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const PatientDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data - replace with API calls
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: 'Dr. Sarah Wilson',
      specialty: 'Cardiologist',
      time: '2:00 PM',
      date: '2024-02-15',
      status: 'confirmed',
      type: 'video',
      avatar: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
      rating: 4.8,
    },
  ];

  const recommendedDoctors = [
    {
      id: 1,
      name: 'Dr. Michael Brown',
      specialty: 'Neurologist',
      rating: 4.9,
      availableSlots: 3,
      avatar: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
      experience: '12 years',
    },
    {
      id: 2,
      name: 'Dr. Emily Davis',
      specialty: 'Dermatologist',
      rating: 4.7,
      availableSlots: 5,
      avatar: 'https://img.freepik.com/free-photo/portrait-smiling-young-woman-doctor-healthcare-medical-worker-pointing-fingers-left-showing-clinic-advertisement_1258-88108.jpg',
      experience: '8 years',
    },
  ];

  const healthMetrics = [
    {
      title: 'Upcoming Appointments',
      value: '2',
      icon: <CalendarIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Prescriptions',
      value: '3',
      icon: <PharmacyIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Medical Records',
      value: '8',
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.success.main,
    },
    {
      title: 'Health Score',
      value: '85%',
      icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.error.main,
    },
  ];

  const healthTimeline = [
    { date: '2024-02-01', event: 'Annual Check-up', status: 'completed' },
    { date: '2024-01-15', event: 'Blood Test Results', status: 'completed' },
    { date: '2024-01-05', event: 'Vaccination', status: 'completed' },
  ];

  const handleBookAppointment = () => {
    navigate('/appointments');
  };

  const handleVideoConsultation = () => {
    navigate('/appointments?type=video');
  };

  const handleViewRecords = () => {
    navigate('/medical-records');
  };

  const handlePrescriptions = () => {
    navigate('/medical-records?tab=prescriptions');
  };

  const quickActions = [
    {
      title: 'Book Appointment',
      description: 'Schedule an in-person consultation with a doctor',
      icon: <CalendarIcon fontSize="large" />,
      action: handleBookAppointment,
      color: theme.palette.primary.main,
    },
    {
      title: 'Video Consultation',
      description: 'Start an online consultation from home',
      icon: <VideoCallIcon fontSize="large" />,
      action: handleVideoConsultation,
      color: theme.palette.success.main,
    },
    {
      title: 'Medical Records',
      description: 'View your medical history and test results',
      icon: <AssignmentIcon fontSize="large" />,
      action: handleViewRecords,
      color: theme.palette.info.main,
    },
    {
      title: 'Prescriptions',
      description: 'Access and manage your prescriptions',
      icon: <PharmacyIcon fontSize="large" />,
      action: handlePrescriptions,
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StyledCard $isDark={isDark}>
              <CardContent>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    color: action.color
                  }}
                >
                  {action.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit' }}
                >
                  {action.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2,
                    color: isDark ? 'rgba(255,255,255,0.65)' : 'text.secondary'
                  }}
                >
                  {action.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={action.action}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ ml: 'auto' }}
                >
                  View
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <StyledPaper $isDark={isDark} sx={{ mt: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: isDark ? '#303030' : 'divider',
            '& .MuiTab-root': {
              color: isDark ? 'rgba(255,255,255,0.65)' : 'inherit',
              '&.Mui-selected': {
                color: isDark ? theme.palette.primary.light : theme.palette.primary.main,
              },
            },
          }}
        >
          <Tab label="Upcoming Appointments" />
          <Tab label="Recent Activities" />
          <Tab label="Health Metrics" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography 
            variant="body1"
            sx={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit' }}
          >
            No upcoming appointments
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography 
            variant="body1"
            sx={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit' }}
          >
            No recent activities
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography 
            variant="body1"
            sx={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'inherit' }}
          >
            No health metrics available
          </Typography>
        </TabPanel>
      </StyledPaper>
    </Box>
  );
};

export default PatientDashboard; 