import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#111', // Dark footer background
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              ThisIsKnotty
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.8)' }}>
            Handmade crochet bags, crafted with love and care. Unique. Sustainable. Knotty.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton
                color="inherit"
                aria-label="Instagram"
                component="a"
                href="https://www.instagram.com/thisisknotty?igsh=Njh0NDVpZXlicWlo"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ '&:hover': { color: '#ffcc00' } }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="TikTok"
                component="a"
                href="https://www.tiktok.com/@thisisknotty?_t=ZS-8y0Z027pStk&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ '&:hover': { color: '#ffcc00' } }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.6 8.64c-1.44 0-2.64-1.2-2.64-2.64V3.12h-3.12v12.24c0 1.44-1.2 2.64-2.64 2.64s-2.64-1.2-2.64-2.64 1.2-2.64 2.64-2.64c.24 0 .48.04.72.12v-3.2c-.24-.04-.48-.08-.72-.08-3.12 0-5.68 2.56-5.68 5.68s2.56 5.68 5.68 5.68 5.68-2.56 5.68-5.68v-4.16c.8.48 1.76.8 2.72.8v-3.12z"/>
                </svg>
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            {quickLinks.map(({ to, label }) => (
              <Link
                key={to}
                component={RouterLink}
                to={to}
                color="inherit"
                sx={{
                  display: 'block',
                  mb: 1.5,
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#ffcc00',
                    textDecoration: 'underline',
                  },
                }}
              >
                {label}
              </Link>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            {[
              'Email: info@thisisknotty.com',
              'Phone: (123) 456-7890',
              'Address: 123 ThisIsKnotty Street, City, Country',
            ].map((line, i) => (
              <Typography
                key={i}
                variant="body2"
                sx={{ mb: i !== 2 ? 1.5 : 0, color: 'rgba(255,255,255,0.8)' }}
              >
                {line}
              </Typography>
            ))}
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            © {currentYear} ThisIsKnotty. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
