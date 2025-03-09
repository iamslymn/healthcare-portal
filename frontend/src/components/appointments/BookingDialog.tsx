import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Grid,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
  doctorId?: string;
}

const steps = ['Select Type', 'Choose Date & Time', 'Confirm Details'];

const BookingDialog = ({ open, onClose, doctorId }: BookingDialogProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    type: 'video',
    date: '',
    time: '',
    reason: '',
    symptoms: '',
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleBookAppointment();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleBookAppointment = async () => {
    try {
      // TODO: Implement API call to book appointment
      console.log('Booking appointment:', bookingData);
      onClose();
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Select Appointment Type
            </Typography>
            <RadioGroup
              value={bookingData.type}
              onChange={(e) => setBookingData({ ...bookingData, type: e.target.value })}
            >
              <FormControlLabel
                value="video"
                control={<Radio />}
                label="Video Consultation"
              />
              <FormControlLabel
                value="in-person"
                control={<Radio />}
                label="In-Person Visit"
              />
            </RadioGroup>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  value={bookingData.time}
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Reason for Visit"
                  multiline
                  rows={2}
                  value={bookingData.reason}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, reason: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Symptoms (if any)"
                  multiline
                  rows={2}
                  value={bookingData.symptoms}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, symptoms: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Book Appointment</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent(activeStep)}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {activeStep > 0 && (
          <Button onClick={handleBack}>Back</Button>
        )}
        <Button
          variant="contained"
          onClick={handleNext}
        >
          {activeStep === steps.length - 1 ? 'Book Appointment' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingDialog; 