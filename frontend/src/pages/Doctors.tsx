import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  CardActions,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useThemeMode } from '../App';
import BookingDialog from '../components/appointments/BookingDialog';
import api from '../services/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const StyledCard = styled(Card)<{ $isDark: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border: 1px solid ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.12)'};
  transition: all 0.3s ease;

  .MuiCardContent-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
  }

  .MuiTypography-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
  }

  .MuiTypography-colorTextSecondary {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.6)'};
  }

  .MuiIconButton-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.54)'};
    &:hover {
      color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.87)'};
    }
  }

  .MuiRating-root {
    color: ${props => props.$isDark ? '#faaf00' : undefined};
  }

  .MuiSvgIcon-colorAction {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.45)' : undefined};
  }
`;

const StyledTextField = styled(TextField)<{ $isDark: boolean }>`
  .MuiOutlinedInput-root {
    background-color: ${props => props.$isDark ? '#141414' : '#ffffff'};
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.23)'};
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.$isDark ? '#1976d2' : '#1976d2'};
    }
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.23)'};
  }
  .MuiInputAdornment-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.45)' : undefined};
  }
`;

const StyledFormControl = styled(FormControl)<{ $isDark: boolean }>`
  .MuiOutlinedInput-root {
    background-color: ${props => props.$isDark ? '#141414' : '#ffffff'};
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.23)'};
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.$isDark ? '#1976d2' : '#1976d2'};
    }
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.23)'};
  }
  .MuiInputLabel-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.45)' : undefined};
    &.Mui-focused {
      color: ${props => props.$isDark ? '#1976d2' : '#1976d2'};
    }
  }
  .MuiSelect-icon {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.45)' : undefined};
  }
`;

const StyledChip = styled(Chip)<{ $isDark: boolean }>`
  background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : undefined};
  color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : undefined};
  border: ${props => props.$isDark ? '1px solid #303030' : undefined};
`;

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  availability: string;
  experience: number;
  languages: string[];
  about: string;
  consultationFee: string;
}

const Doctors = () => {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for storing doctors from API and registered users
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // List of specialties for the filter dropdown
  const specialties = [
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Orthopedics',
    'Neurology',
    'Psychiatry',
    'General Medicine',
    'Family Medicine',
    'Internal Medicine',
    'Obstetrics & Gynecology',
    'Ophthalmology',
    'Otolaryngology',
    'Urology',
    'Gastroenterology',
    'Endocrinology',
    'Pulmonology',
    'Rheumatology',
    'Hematology',
    'Oncology',
    'Nephrology',
    'Allergy & Immunology',
    'Infectious Disease',
    'Physical Medicine',
    'Radiology',
    'Anesthesiology',
    'Emergency Medicine',
    'Pathology',
    'Plastic Surgery',
    'Vascular Surgery'
  ];

  // Fetch doctors from API and registered users with doctor role
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError('');
      
      try {
        // Fetch hardcoded doctors from API (if available)
        // const response = await api.get('/doctors');
        // const apiDoctors = response.data;
        
        // For now, use hardcoded doctors
        const hardcodedDoctors = [
          {
            id: '1',
            name: 'Dr. Sarah Wilson',
            specialty: 'Cardiology',
            image: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
            rating: 4.8,
            reviewCount: 124,
            location: 'New York, NY',
            availability: 'Available today',
            experience: 12,
            languages: ['English', 'Spanish'],
            about: 'Dr. Wilson is a board-certified cardiologist with over 12 years of experience in treating heart conditions.',
            consultationFee: '$150'
          },
          {
            id: '2',
            name: 'Dr. Michael Brown',
            specialty: 'Dermatology',
            image: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
            rating: 4.7,
            reviewCount: 98,
            location: 'Los Angeles, CA',
            availability: 'Available tomorrow',
            experience: 8,
            languages: ['English', 'French'],
            about: 'Dr. Brown specializes in medical and cosmetic dermatology, with a focus on skin cancer prevention and treatment.',
            consultationFee: '$130'
          },
          {
            id: '3',
            name: 'Dr. Emily Davis',
            specialty: 'Pediatrics',
            image: 'https://img.freepik.com/free-photo/portrait-smiling-young-woman-doctor-healthcare-medical-worker-pointing-fingers-left-showing-clinic-advertisement_1258-88108.jpg',
            rating: 4.9,
            reviewCount: 156,
            location: 'Chicago, IL',
            availability: 'Available today',
            experience: 15,
            languages: ['English'],
            about: 'Dr. Davis is a compassionate pediatrician who provides comprehensive care for children from birth through adolescence.',
            consultationFee: '$120'
          },
          {
            id: '4',
            name: 'Dr. James Taylor',
            specialty: 'Orthopedics',
            image: 'https://img.freepik.com/free-photo/medium-shot-doctor-with-crossed-arms_23-2148868314.jpg',
            rating: 4.6,
            reviewCount: 87,
            location: 'Houston, TX',
            availability: 'Available in 2 days',
            experience: 10,
            languages: ['English', 'German'],
            about: 'Dr. Taylor specializes in sports medicine and joint replacement surgery, helping patients regain mobility and reduce pain.',
            consultationFee: '$160'
          },
          {
            id: '5',
            name: 'Dr. Jessica Martinez',
            specialty: 'Neurology',
            image: 'https://img.freepik.com/free-photo/front-view-female-doctor-with-medical-mask-posing-with-crossed-arms_23-2148445082.jpg',
            rating: 4.8,
            reviewCount: 112,
            location: 'Miami, FL',
            availability: 'Available today',
            experience: 14,
            languages: ['English', 'Spanish'],
            about: 'Dr. Martinez is a neurologist who diagnoses and treats disorders of the nervous system, including the brain, spinal cord, and nerves.',
            consultationFee: '$170'
          },
          {
            id: '6',
            name: 'Dr. Robert Johnson',
            specialty: 'Psychiatry',
            image: 'https://img.freepik.com/free-photo/handsome-young-male-doctor-with-stethoscope-standing-against-blue-background_662251-337.jpg',
            rating: 4.7,
            reviewCount: 93,
            location: 'Boston, MA',
            availability: 'Available tomorrow',
            experience: 11,
            languages: ['English'],
            about: 'Dr. Johnson provides compassionate psychiatric care, specializing in mood disorders, anxiety, and PTSD treatment.',
            consultationFee: '$140'
          }
        ];
        
        // Fetch registered users with doctor role
        const usersResponse = await api.get('/users');
        const registeredDoctors = usersResponse.data
          .filter((user: any) => user.role === 'doctor')
          .map((user: any) => ({
            id: user.id,
            name: `Dr. ${user.firstName} ${user.lastName}`,
            specialty: user.specialty || 'General Medicine',
            image: user.profilePicture || 'https://img.freepik.com/free-photo/medium-shot-doctor-with-crossed-arms_23-2148868314.jpg',
            rating: 5.0,
            reviewCount: 0,
            location: user.location || 'Not specified',
            availability: 'Available soon',
            experience: user.experience || 1,
            languages: ['English'],
            about: user.about || `Dr. ${user.firstName} ${user.lastName} is a registered doctor on our platform.`,
            consultationFee: user.consultationFee || '$100'
          }));
        
        // Combine hardcoded doctors and registered doctors
        setDoctors([...hardcodedDoctors, ...registeredDoctors]);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Failed to load doctors. Please try again later.');
        // Fall back to hardcoded doctors if API fails
        setDoctors([
          // ... existing hardcoded doctors ...
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctors();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSpecialtyChange = (event: any) => {
    setSpecialty(event.target.value);
  };

  const handleToggleFavorite = (doctorId: string) => {
    setFavorites(prev => {
      if (prev.includes(doctorId)) {
        return prev.filter(id => id !== doctorId);
      } else {
        return [...prev, doctorId];
      }
    });
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !specialty || doctor.specialty === specialty;
    const matchesFavorites = !showFavoritesOnly || favorites.includes(doctor.id);
    return matchesSearch && matchesSpecialty && matchesFavorites;
  });

  const handleBookAppointment = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setIsBookingOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit' }}
        >
          Find Doctors
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <StyledTextField
              $isDark={isDark}
              fullWidth
              placeholder="Search by doctor name or specialty"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledFormControl $isDark={isDark} fullWidth>
              <InputLabel>Specialty</InputLabel>
              <Select
                value={specialty}
                label="Specialty"
                onChange={handleSpecialtyChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                      backgroundColor: isDark ? '#141414' : '#ffffff',
                    },
                  },
                }}
              >
                <MenuItem 
                  value=""
                  sx={{ 
                    color: isDark ? 'rgba(255, 255, 255, 0.85)' : undefined,
                    '&:hover': {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : undefined,
                    },
                    '&.Mui-selected': {
                      backgroundColor: isDark ? 'rgba(25, 118, 210, 0.2)' : undefined,
                      color: isDark ? '#1976d2' : undefined,
                    },
                  }}
                >
                  All Specialties
                </MenuItem>
                {specialties.map((s) => (
                  <MenuItem 
                    key={s} 
                    value={s}
                    sx={{ 
                      color: isDark ? 'rgba(255, 255, 255, 0.85)' : undefined,
                      '&:hover': {
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : undefined,
                      },
                      '&.Mui-selected': {
                        backgroundColor: isDark ? 'rgba(25, 118, 210, 0.2)' : undefined,
                        color: isDark ? '#1976d2' : undefined,
                      },
                    }}
                  >
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant={showFavoritesOnly ? "contained" : "outlined"}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              startIcon={<FavoriteIcon />}
              sx={{
                height: '100%',
                backgroundColor: showFavoritesOnly && isDark ? 'rgba(25, 118, 210, 0.2)' : undefined,
                color: showFavoritesOnly && isDark ? '#1976d2' : undefined,
                '&:hover': {
                  backgroundColor: showFavoritesOnly && isDark ? 'rgba(25, 118, 210, 0.3)' : undefined,
                },
              }}
            >
              {showFavoritesOnly ? 'Show All' : 'Show Favorites'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {loading ? (
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          </Grid>
        ) : error ? (
          <Grid item xs={12}>
            <Alert severity="error" sx={{ my: 4 }}>
              {error}
            </Alert>
          </Grid>
        ) : filteredDoctors.map((doctor) => (
          <Grid item xs={12} md={6} lg={4} key={doctor.id}>
            <StyledCard $isDark={isDark}>
              <CardMedia
                component="img"
                height="200"
                image={doctor.image}
                alt={doctor.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {doctor.name}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      {doctor.specialty}
                    </Typography>
                  </Box>
                  <IconButton 
                    onClick={() => handleToggleFavorite(doctor.id)}
                    sx={{
                      color: favorites.includes(doctor.id) ? 'error.main' : undefined,
                    }}
                  >
                    {favorites.includes(doctor.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={doctor.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({doctor.reviewCount} reviews)
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {doctor.location}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTimeIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {doctor.availability}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {doctor.experience} years experience
                </Typography>

                <Box sx={{ mt: 1 }}>
                  {doctor.languages.map((language) => (
                    <StyledChip
                      key={language}
                      label={language}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                      $isDark={isDark}
                    />
                  ))}
                </Box>

                <Typography variant="body2" sx={{ mt: 2 }}>
                  {doctor.about}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleBookAppointment(doctor.id)}
                  sx={{
                    backgroundColor: isDark ? 'rgba(25, 118, 210, 0.2)' : undefined,
                    color: isDark ? '#1976d2' : undefined,
                    '&:hover': {
                      backgroundColor: isDark ? 'rgba(25, 118, 210, 0.3)' : undefined,
                    },
                  }}
                >
                  Book Appointment - {doctor.consultationFee}
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {selectedDoctor && (
        <BookingDialog
          open={isBookingOpen}
          doctorId={selectedDoctor}
          onClose={() => {
            setIsBookingOpen(false);
            setSelectedDoctor(null);
          }}
        />
      )}
    </Container>
  );
};

export default Doctors; 