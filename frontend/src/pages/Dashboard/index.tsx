import { useSelector } from 'react-redux';
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import { RootState } from '../../store';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.firstName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's an overview of your {user?.role === 'doctor' ? 'practice' : 'health'} dashboard
        </Typography>
      </Box>

      {user?.role === 'doctor' ? (
        <DoctorDashboard />
      ) : (
        <PatientDashboard />
      )}
    </Box>
  );
};

export default Dashboard; 