import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  ShoppingCart,
  Logout,
  Person,
  People,
  Store,
  Favorite,
  LocalShipping,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { AuthContext } from '../auth/AuthContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fff', // White background
  color: '#222',           // Dark text
  boxShadow: 'none',
  borderBottom: '1px solid #e0e0e0', // Subtle bottom border
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  color: '#222', // Dark text
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginRight: theme.spacing(4),
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: '#222',
  background: 'none',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '1rem',
  padding: '8px 20px',
  borderRadius: 0,
  minWidth: 'unset',
  '&:hover': {
    color: '#9CAF88', // ThisIsKnotty sage accent
    background: 'none',
    textDecoration: 'underline',
  },
}));

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMobileToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard', roles: ['customer', 'admin'] },
    { text: 'My Orders', icon: <ShoppingCart />, path: '/orders', roles: ['customer'] },
    { text: 'Wishlist', icon: <Favorite />, path: '/wishlist', roles: ['customer'] },
    { text: 'Profile', icon: <Person />, path: '/profile', roles: ['customer', 'admin'] },
    { text: 'Manage Products', icon: <Store />, path: '/admin/products', roles: ['admin'] },
    { text: 'Manage Orders', icon: <LocalShipping />, path: '/admin/orders', roles: ['admin'] },
    { text: 'User Management', icon: <People />, path: '/admin/users', roles: ['admin'] },
  ];

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(user?.role));

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar src={user?.profileImage} alt={user?.firstName} />
        <Box>
          <Typography variant="subtitle1">{user?.firstName} {user?.lastName}</Typography>
          <Typography variant="body2" color="text.secondary">{user?.role}</Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        {filteredMenuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            onClick={handleMobileToggle}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
        <Divider />
        <ListItem>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ fontWeight: 700, color: '#9CAF88', cursor: 'pointer' }}>EN</Box>
            <span>|</span>
            <Box sx={{ fontWeight: 500, color: '#888', cursor: 'pointer' }}>FR</Box>
          </Box>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleMobileToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Logo component={RouterLink} to="/">
            ThisIsKnotty
          </Logo>

          <Box sx={{ flexGrow: 1 }} />

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <NavButton component={RouterLink} to="/">
                Home
              </NavButton>
              <NavButton component={RouterLink} to="/shop">
                Shop
              </NavButton>
              <NavButton component={RouterLink} to="/about">
                About
              </NavButton>
              <NavButton component={RouterLink} to="/contact">
                Contact
              </NavButton>

              <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', fontSize: '0.95rem', color: '#222', gap: 1 }}>
                <Box sx={{ fontWeight: 700, color: '#9CAF88', cursor: 'pointer' }}>EN</Box>
                <span>|</span>
                <Box sx={{ fontWeight: 500, color: '#888', cursor: 'pointer' }}>FR</Box>
              </Box>

              {user ? (
                <>
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    <Avatar
                      src={user.profileImage}
                      alt={user.firstName}
                      sx={{ width: 32, height: 32 }}
                    />
                  </IconButton>
                </>
              ) : (
                <>
                  <NavButton component={RouterLink} to="/login">
                    Login
                  </NavButton>
                  <NavButton
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    color="secondary"
                  >
                    Register
                  </NavButton>
                </>
              )}
            </Box>
          )}

          {user && (
            <>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {filteredMenuItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    onClick={handleMenuClose}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon><Logout /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleMobileToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </StyledAppBar>
  );
};

export default Navbar;
