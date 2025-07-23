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
  Search,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import { AuthContext } from '../auth/AuthContext';
import knottyLogo from '../../assets/knottylogo.jpg';

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
  cursor: 'default', // Ensure default cursor
  '&:hover': {
    color: '#222', // Prevent color change on hover
    textDecoration: 'none',
    cursor: 'default', // Keep default cursor on hover
  },
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
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleMenuIconClick = (event) => setAnchorElMenu(event.currentTarget);
  const handleMenuCloseMenu = () => setAnchorElMenu(null);
  const handleCategoryClick = () => setCategoryOpen((prev) => !prev);

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
      </List>
    </Box>
  );

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          {/* Left: Hamburger menu */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" aria-label="menu" onClick={handleMobileToggle}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleMobileToggle}
              >
                <Box sx={{ width: 250, p: 2 }} role="presentation" onClick={handleMobileToggle}>
                  <List sx={{ color: '#222', fontFamily: 'Century Gothic, Arial, sans-serif' }}>
                    <ListItem button component={RouterLink} to="/" sx={{ color: '#222', fontFamily: 'Century Gothic, Arial, sans-serif' }}>
                      <ListItemText primary="Home" primaryTypographyProps={{ fontFamily: 'Century Gothic, Arial, sans-serif' }} />
                    </ListItem>
                    <ListItem button onClick={e => { e.stopPropagation(); handleCategoryClick(); }} sx={{ color: '#222', fontFamily: 'Century Gothic, Arial, sans-serif', '&:hover': { color: '#222', backgroundColor: '#f5f5f5' } }}>
                      <ListItemText primary="Category" primaryTypographyProps={{ fontFamily: 'Century Gothic, Arial, sans-serif' }} />
                      {categoryOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding sx={{ color: '#222', fontFamily: 'Century Gothic, Arial, sans-serif' }}>
                        <ListItem button component={RouterLink} to="/tote-bags" sx={{ pl: 4, color: '#222', fontFamily: 'Century Gothic, Arial, sans-serif' }}>
                          <ListItemText primary="Tote Bags" primaryTypographyProps={{ fontFamily: 'Century Gothic, Arial, sans-serif' }} />
                        </ListItem>
                        <ListItem button component={RouterLink} to="/clutches" sx={{ pl: 4, color: '#222', fontFamily: 'Century Gothic, Arial, sans-serif' }}>
                          <ListItemText primary="Clutches" primaryTypographyProps={{ fontFamily: 'Century Gothic, Arial, sans-serif' }} />
                        </ListItem>
                        <ListItem button component={RouterLink} to="/sleeves" sx={{ pl: 4, color: '#222', fontFamily: 'Century Gothic, Arial, sans-serif' }}>
                          <ListItemText primary="Sleeves" primaryTypographyProps={{ fontFamily: 'Century Gothic, Arial, sans-serif' }} />
                        </ListItem>
                      </List>
                    </Collapse>
                    <ListItem button component={RouterLink} to="/login" sx={{ color: '#222', fontFamily: 'Century Gothic, Arial, sans-serif' }}>
                      <ListItemText primary="Sign In" primaryTypographyProps={{ fontFamily: 'Century Gothic, Arial, sans-serif' }} />
                    </ListItem>
                    <ListItem button component={RouterLink} to="/orders" sx={{ color: '#222', fontFamily: 'Century Gothic, Arial, sans-serif' }}>
                      <ListItemText primary="My Orders" primaryTypographyProps={{ fontFamily: 'Century Gothic, Arial, sans-serif' }} />
                    </ListItem>
                    <ListItem button component={RouterLink} to="/wishlist" sx={{ color: '#222', fontFamily: 'Century Gothic, Arial, sans-serif' }}>
                      <ListItemText primary="Wishlist" primaryTypographyProps={{ fontFamily: 'Century Gothic, Arial, sans-serif' }} />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </Box>
          )}

          {/* Center: Logo */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
            <Logo>
              <img src={knottyLogo} alt="Knotty Logo" style={{ height: 32, marginRight: 12 }} />
              thisisknotty
            </Logo>
          </Box>

          {/* Right: search, cart icons */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton component={RouterLink} to="/search" color="inherit" aria-label="search">
                <Search />
              </IconButton>
              <IconButton component={RouterLink} to="/cart" color="inherit" aria-label="cart">
                <ShoppingCart />
              </IconButton>
            </Box>
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
