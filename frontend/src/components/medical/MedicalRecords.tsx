import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  LocalPharmacy as PharmacyIcon,
  Science as ScienceIcon,
} from '@mui/icons-material';
import { useThemeMode } from '../../App';
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

  .MuiListItemIcon-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.54)'};
  }
`;

const StyledDivider = styled(Divider)<{ $isDark: boolean }>`
  background-color: ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.12)'};
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
      id={`medical-records-tabpanel-${index}`}
      aria-labelledby={`medical-records-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

// Mock data - replace with API calls later
const mockMedicalHistory = [
  {
    id: 1,
    date: '2024-02-01',
    type: 'Check-up',
    doctor: 'Dr. Sarah Wilson',
    notes: 'Regular annual check-up. All vitals normal.',
    status: 'completed',
  },
  {
    id: 2,
    date: '2024-01-15',
    type: 'Blood Test',
    doctor: 'Dr. Michael Brown',
    notes: 'Routine blood work. Results within normal range.',
    status: 'completed',
  },
];

const mockPrescriptions = [
  {
    id: 1,
    date: '2024-02-01',
    medicine: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Twice daily',
    duration: '7 days',
    doctor: 'Dr. Sarah Wilson',
    status: 'active',
  },
  {
    id: 2,
    date: '2024-01-15',
    medicine: 'Ibuprofen',
    dosage: '400mg',
    frequency: 'As needed',
    duration: '5 days',
    doctor: 'Dr. Michael Brown',
    status: 'completed',
  },
];

const mockTestResults = [
  {
    id: 1,
    date: '2024-02-01',
    type: 'Blood Test',
    doctor: 'Dr. Sarah Wilson',
    result: 'Normal',
    notes: 'All parameters within normal range',
  },
  {
    id: 2,
    date: '2024-01-15',
    type: 'X-Ray',
    doctor: 'Dr. Michael Brown',
    result: 'Normal',
    notes: 'No abnormalities detected',
  },
];

const MedicalRecords: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <StyledPaper $isDark={isDark} sx={{ p: 2 }}>
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit' }}
        >
          Medical Records
        </Typography>
        <Box>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="medical records tabs">
            <Tab 
              icon={<AssignmentIcon />} 
              label="Medical History" 
              id="medical-records-tab-0"
              aria-controls="medical-records-tabpanel-0"
            />
            <Tab 
              icon={<PharmacyIcon />} 
              label="Prescriptions" 
              id="medical-records-tab-1"
              aria-controls="medical-records-tabpanel-1"
            />
            <Tab 
              icon={<ScienceIcon />} 
              label="Test Results" 
              id="medical-records-tab-2"
              aria-controls="medical-records-tabpanel-2"
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <List>
            {mockMedicalHistory.map((record) => (
              <React.Fragment key={record.id}>
                <StyledListItem $isDark={isDark}>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">{record.type}</Typography>
                        <Chip 
                          label={record.status} 
                          color={record.status === 'completed' ? 'success' : 'primary'} 
                          size="small"
                          sx={{
                            backgroundColor: isDark ? 'rgba(76, 175, 80, 0.2)' : undefined,
                            color: isDark ? '#4caf50' : undefined,
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Date: {record.date}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Doctor: {record.doctor}
                        </Typography>
                        <Typography variant="body2">
                          Notes: {record.notes}
                        </Typography>
                      </>
                    }
                  />
                </StyledListItem>
                <StyledDivider $isDark={isDark} />
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <List>
            {mockPrescriptions.map((prescription) => (
              <React.Fragment key={prescription.id}>
                <StyledListItem $isDark={isDark}>
                  <ListItemIcon>
                    <PharmacyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">{prescription.medicine}</Typography>
                        <Chip 
                          label={prescription.status} 
                          color={prescription.status === 'active' ? 'primary' : 'default'} 
                          size="small"
                          sx={{
                            backgroundColor: isDark && prescription.status === 'active' ? 'rgba(25, 118, 210, 0.2)' : undefined,
                            color: isDark && prescription.status === 'active' ? '#1976d2' : undefined,
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Date: {prescription.date}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Dosage: {prescription.dosage} | Frequency: {prescription.frequency}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Duration: {prescription.duration} | Doctor: {prescription.doctor}
                        </Typography>
                      </>
                    }
                  />
                </StyledListItem>
                <StyledDivider $isDark={isDark} />
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <List>
            {mockTestResults.map((test) => (
              <React.Fragment key={test.id}>
                <StyledListItem $isDark={isDark}>
                  <ListItemIcon>
                    <ScienceIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">{test.type}</Typography>
                        <Chip 
                          label={test.result} 
                          color={test.result === 'Normal' ? 'success' : 'warning'} 
                          size="small"
                          sx={{
                            backgroundColor: isDark ? 'rgba(76, 175, 80, 0.2)' : undefined,
                            color: isDark ? '#4caf50' : undefined,
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Date: {test.date}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Doctor: {test.doctor}
                        </Typography>
                        <Typography variant="body2">
                          Notes: {test.notes}
                        </Typography>
                      </>
                    }
                  />
                </StyledListItem>
                <StyledDivider $isDark={isDark} />
              </React.Fragment>
            ))}
          </List>
        </TabPanel>
      </StyledPaper>
    </Container>
  );
};

export default MedicalRecords; 