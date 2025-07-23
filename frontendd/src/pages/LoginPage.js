import React from 'react';
import { Box, Typography, TextField, Button, Divider } from '@mui/material';
import googleLogo from '../assets/google.jpg';
import { useGoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const loginWithGoogle = useGoogleLogin({
    onSuccess: tokenResponse => {
      // You get access token here: tokenResponse.access_token
      // Send this token to your backend or use it as needed
      console.log(tokenResponse);
    },
    onError: error => {
      console.error('Google Login Failed:', error);
    }
  });

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', pt: 8, background: '#fafbfc' }}>
      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', letterSpacing: 1 }}>
        MY KNOTTY ACCOUNT
      </Typography>

      {/* Login Form */}
      <Box sx={{ width: '100%', maxWidth: 400, background: '#fff', p: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', mb: 4 }}>
        <TextField
          label="Email"
              type="email"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
              type="password"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 2, py: 1.2, fontWeight: 600 }}>
          Continue
        </Button>
        <Divider sx={{ my: 2 }}>OR</Divider>
        <Button variant="outlined" color="primary" fullWidth sx={{ py: 1.2, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }} onClick={() => loginWithGoogle()}>
          <img src={googleLogo} alt="Google" style={{ width: 24, height: 24, marginRight: 8 }} />
          Continue with Google Account
        </Button>
      </Box>

      {/* Join Knotty Section */}
      <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center', background: '#fff', p: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, letterSpacing: 1 }}>
          JOIN KNOTTY
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2 }}>
          TRACK YOUR ORDERS
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: '#444' }}>
          Follow your orders every step of the way.
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2 }}>
          STREAMLINE CHECKOUT
        </Typography>
        <Typography variant="body2" sx={{ color: '#444' }}>
          Chcekout faster with saved addresses and payment methods.
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;