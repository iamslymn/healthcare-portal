import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useThemeMode } from '../App';
import styled from '@emotion/styled';

const StyledFooter = styled(Box)<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  border-top: 1px solid ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.12)'};
  color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
  transition: all 0.3s ease;

  .MuiIconButton-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.54)'};
    &:hover {
      color: ${props => props.$isDark ? '#fff' : '#000'};
      background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
    }
  }

  .MuiDivider-root {
    background-color: ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.12)'};
  }

  .MuiTypography-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
  }

  .MuiTypography-secondary {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.6)'};
  }

  .footer-link {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.6)'};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.$isDark ? '#fff' : '#000'};
    }
  }

  .contact-info {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    
    .MuiSvgIcon-root {
      margin-right: 8px;
      color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.54)'};
    }
  }
`;

const Footer: React.FC = () => {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <StyledFooter
      $isDark={isDark}
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              We are dedicated to providing the best healthcare services through our innovative platform,
              connecting patients with healthcare professionals seamlessly.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/about" className="footer-link" sx={{ display: 'block', mb: 1 }}>
              About Us
            </Link>
            <Link href="/services" className="footer-link" sx={{ display: 'block', mb: 1 }}>
              Our Services
            </Link>
            <Link href="/doctors" className="footer-link" sx={{ display: 'block', mb: 1 }}>
              Find Doctors
            </Link>
            <Link href="/contact" className="footer-link" sx={{ display: 'block', mb: 1 }}>
              Contact Us
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Box className="contact-info">
              <LocationIcon />
              <Typography variant="body2" color="text.secondary">
                123 Healthcare Ave, Medical City, MC 12345
              </Typography>
            </Box>
            <Box className="contact-info">
              <PhoneIcon />
              <Typography variant="body2" color="text.secondary">
                +1 (555) 123-4567
              </Typography>
            </Box>
            <Box className="contact-info">
              <EmailIcon />
              <Typography variant="body2" color="text.secondary">
                contact@healthcareportal.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Healthcare Portal. All rights reserved.
        </Typography>
      </Container>
    </StyledFooter>
  );
};

export default Footer; 