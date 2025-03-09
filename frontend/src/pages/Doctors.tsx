import { useState } from 'react';
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
  location: string;
  experience: number;
  rating: number;
  reviewCount: number;
  availability: string;
  image: string;
  education: string;
  languages: string[];
  consultationFee: number;
  about: string;
}

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  // Mock data - replace with API call
  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      specialty: 'Cardiologist',
      location: 'New York, NY',
      experience: 15,
      rating: 4.8,
      reviewCount: 124,
      availability: 'Available Today',
      image: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
      education: 'MD - Cardiology, MBBS',
      languages: ['English', 'Spanish'],
      consultationFee: 150,
      about: 'Experienced cardiologist specializing in preventive cardiology and heart disease management.',
    },
    {
      id: '2',
      name: 'Dr. Michael Brown',
      specialty: 'Neurologist',
      location: 'Los Angeles, CA',
      experience: 12,
      rating: 4.9,
      reviewCount: 98,
      availability: 'Next Available: Tomorrow',
      image: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
      education: 'MD - Neurology, MBBS',
      languages: ['English', 'French'],
      consultationFee: 180,
      about: 'Specialized in treating neurological disorders with a focus on stroke prevention and treatment.',
    },
    {
      id: '3',
      name: 'Dr. Emily Davis',
      specialty: 'Dermatologist',
      location: 'Chicago, IL',
      experience: 8,
      rating: 4.7,
      reviewCount: 156,
      availability: 'Available Today',
      image: 'https://img.freepik.com/free-photo/portrait-smiling-young-woman-doctor-healthcare-medical-worker-pointing-fingers-left-showing-clinic-advertisement_1258-88108.jpg',
      education: 'MD - Dermatology, MBBS',
      languages: ['English', 'Mandarin'],
      consultationFee: 130,
      about: 'Expert in cosmetic dermatology and skin cancer treatment with a holistic approach to skincare.',
    },
    {
      id: '4',
      name: 'Dr. James Rodriguez',
      specialty: 'Pediatrician',
      location: 'Miami, FL',
      experience: 10,
      rating: 4.9,
      reviewCount: 210,
      availability: 'Available Today',
      image: 'https://img.freepik.com/free-photo/medium-shot-doctor-with-crossed-arms_23-2148868314.jpg',
      education: 'MD - Pediatrics, MBBS',
      languages: ['English', 'Spanish', 'Portuguese'],
      consultationFee: 140,
      about: 'Dedicated pediatrician with a gentle approach to child healthcare and preventive medicine.',
    },
    {
      id: '5',
      name: 'Dr. Lisa Chen',
      specialty: 'Orthopedist',
      location: 'San Francisco, CA',
      experience: 14,
      rating: 4.8,
      reviewCount: 178,
      availability: 'Next Available: Tomorrow',
      image: 'https://img.freepik.com/free-photo/front-view-female-doctor-with-medical-mask-posing-with-crossed-arms_23-2148445082.jpg',
      education: 'MD - Orthopedics, MBBS',
      languages: ['English', 'Mandarin', 'Cantonese'],
      consultationFee: 160,
      about: 'Specialized in sports medicine and joint replacement surgery with a focus on minimally invasive procedures.',
    },
    {
      id: '6',
      name: 'Dr. Robert Taylor',
      specialty: 'Psychiatrist',
      location: 'Boston, MA',
      experience: 16,
      rating: 4.9,
      reviewCount: 145,
      availability: 'Available Today',
      image: 'https://img.freepik.com/free-photo/handsome-young-male-doctor-with-stethoscope-standing-against-blue-background_662251-337.jpg',
      education: 'MD - Psychiatry, MBBS',
      languages: ['English', 'German'],
      consultationFee: 170,
      about: 'Experienced psychiatrist specializing in anxiety, depression, and stress management with a holistic treatment approach.',
    }
  ];

  const specialties = [
    'Allergist',
    'Anesthesiologist',
    'Cardiologist',
    'Dermatologist',
    'Endocrinologist',
    'Family Medicine',
    'Gastroenterologist',
    'General Surgeon',
    'Gynecologist',
    'Hematologist',
    'Internal Medicine',
    'Nephrologist',
    'Neurologist',
    'Neurosurgeon',
    'Obstetrician',
    'Oncologist',
    'Ophthalmologist',
    'Orthopedist',
    'Otolaryngologist',
    'Pediatrician',
    'Plastic Surgeon',
    'Psychiatrist',
    'Pulmonologist',
    'Radiologist',
    'Rheumatologist',
    'Urologist',
    'Vascular Surgeon'
  ];

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
    <Box>
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
        {filteredDoctors.map((doctor) => (
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
                  Book Appointment - ${doctor.consultationFee}
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
    </Box>
  );
};

export default Doctors; 