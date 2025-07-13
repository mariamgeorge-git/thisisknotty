import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Email } from '@mui/icons-material';

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Here you would typically make an API call to send reset email
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage('Password reset link has been sent to your email address.');
      setEmail('');
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        p: 4,
        backgroundColor: '#FDFBF7',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        border: '1px solid #E0E0E0',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#2C2C2C', mb: 1 }}>
          Forgot Password?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enter your email address and we'll send you a link to reset your password.
        </Typography>
      </Box>

      {message && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: <Email sx={{ mr: 1, color: '#9CAF88' }} />,
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading || !email}
          sx={{
            py: 1.5,
            backgroundColor: '#9CAF88',
            '&:hover': {
              backgroundColor: '#8A9A7A',
            },
            '&:disabled': {
              backgroundColor: '#E0E0E0',
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: 'white' }} />
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </form>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Remember your password?{' '}
          <Button
            variant="text"
            sx={{
              color: '#9CAF88',
              textTransform: 'none',
              p: 0,
              minWidth: 'auto',
            }}
            onClick={() => window.history.back()}
          >
            Back to Login
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgetPasswordForm; 