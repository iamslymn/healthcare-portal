import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
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
  useTheme,
  Grid,
} from '@mui/material';
import {
  VideoCall as VideoCallIcon,
  Edit as EditIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import BookingDialog from '../components/appointments/BookingDialog';
import { useThemeMode } from '../App';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: 1px solid ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.12)'};
  color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
  transition: all 0.3s ease;

  .MuiTabs-root {
    border-bottom: 1px solid ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.12)'};
  }

  .MuiTab-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.87)'};
    &.Mui-selected {
      color: ${props => props.$isDark ? '#fff' : '#1976d2'};
    }
  }
`;

const StyledListItem = styled(ListItem)<{ $isDark: boolean }>`
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.12)'};
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
  }

  .MuiTypography-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
  }

  .MuiTypography-secondary {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.6)'};
  }

  .MuiIconButton-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.54)'};
    &:hover {
      color: ${props => props.$isDark ? '#fff' : '#000'};
      background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
    }
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
      id={`appointments-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Appointments = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const theme = useTheme();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  // Mock data - replace with API calls
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: 'Dr. Sarah Wilson',
      specialty: 'Cardiologist',
      date: '2024-02-15',
      time: '10:00 AM',
      type: 'video',
      status: 'confirmed',
      avatar: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Brown',
      specialty: 'Neurologist',
      date: '2024-02-20',
      time: '2:30 PM',
      type: 'in-person',
      status: 'pending',
      avatar: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
    },
  ];

  const pastAppointments = [
    {
      id: 3,
      doctorName: 'Dr. Emily Davis',
      specialty: 'Dermatologist',
      date: '2024-01-30',
      time: '3:00 PM',
      type: 'video',
      status: 'completed',
      avatar: 'https://img.freepik.com/free-photo/portrait-smiling-young-woman-doctor-healthcare-medical-worker-pointing-fingers-left-showing-clinic-advertisement_1258-88108.jpg',
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircleIcon fontSize="small" />;
      case 'pending':
        return <ScheduleIcon fontSize="small" />;
      case 'cancelled':
        return <CancelIcon fontSize="small" />;
      default:
        return undefined;
    }
  };

  return (
    <Box>
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit' 
          }}
        >
          Appointments
        </Typography>
        <Button
          variant="contained"
          startIcon={<ScheduleIcon />}
          onClick={() => setIsBookingDialogOpen(true)}
          sx={{
            backgroundColor: isDark ? '#1976d2' : undefined,
            '&:hover': {
              backgroundColor: isDark ? '#1565c0' : undefined,
            }
          }}
        >
          Book Appointment
        </Button>
      </Box>

      <StyledPaper $isDark={isDark} sx={{ width: '100%', mb: 4 }}>
        <Box>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Upcoming Appointments" />
            <Tab label="Past Appointments" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <List>
            {upcomingAppointments.map((appointment) => (
              <StyledListItem $isDark={isDark} key={appointment.id}>
                <ListItemAvatar>
                  <Avatar src={appointment.avatar}>
                    {appointment.doctorName[3]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {appointment.doctorName}
                      {appointment.type === 'video' && (
                        <VideoCallIcon color="primary" fontSize="small" />
                      )}
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" component="span" display="block">
                        {appointment.specialty}
                      </Typography>
                      <Typography variant="body2" component="span">
                        {`${appointment.date} at ${appointment.time}`}
                      </Typography>
                      <Chip
                        size="small"
                        label={appointment.status}
                        color={getStatusColor(appointment.status) as any}
                        icon={getStatusIcon(appointment.status)}
                        sx={{ ml: 1 }}
                      />
                    </>
                  }
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {appointment.type === 'video' && appointment.status === 'confirmed' && (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<VideoCallIcon />}
                      size="small"
                      sx={{
                        backgroundColor: isDark ? '#1976d2' : undefined,
                        '&:hover': {
                          backgroundColor: isDark ? '#1565c0' : undefined,
                        }
                      }}
                    >
                      Join Call
                    </Button>
                  )}
                  <IconButton size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <CancelIcon />
                  </IconButton>
                </Box>
              </StyledListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <List>
            {pastAppointments.map((appointment) => (
              <StyledListItem $isDark={isDark} key={appointment.id}>
                <ListItemAvatar>
                  <Avatar src={appointment.avatar}>
                    {appointment.doctorName[3]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={appointment.doctorName}
                  secondary={
                    <>
                      <Typography variant="body2" component="span" display="block">
                        {appointment.specialty}
                      </Typography>
                      <Typography variant="body2" component="span">
                        {`${appointment.date} at ${appointment.time}`}
                      </Typography>
                      <Chip
                        size="small"
                        label={appointment.status}
                        color={getStatusColor(appointment.status) as any}
                        icon={getStatusIcon(appointment.status)}
                        sx={{ ml: 1 }}
                      />
                    </>
                  }
                />
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.23)' : undefined,
                    color: isDark ? 'rgba(255, 255, 255, 0.85)' : undefined,
                    '&:hover': {
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.5)' : undefined,
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : undefined,
                    }
                  }}
                >
                  View Details
                </Button>
              </StyledListItem>
            ))}
          </List>
        </TabPanel>
      </StyledPaper>

      <BookingDialog
        open={isBookingDialogOpen}
        onClose={() => setIsBookingDialogOpen(false)}
      />
    </Box>
  );
};

export default Appointments; 