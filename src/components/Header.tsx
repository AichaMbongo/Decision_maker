import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Container, Avatar, MenuItem, Menu, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from '../theme/theme';
import { useBreadcrumbs } from '../contexts/BreadcrumbsProvider';

const navItems = [
  { label: 'DecisionMaker', path: '/' },
  { label: 'New Decision', path: '/NewDecision' },
  { label: 'Previous Decisions', path: '/PreviousDecision' },
  { label: 'About', path: '/aboutUs' },
  { label: 'Contact Us', path: '/contactUs' },
];

const Header = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { handleNavigation, resetBreadcrumbs } = useBreadcrumbs();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeAuth = () => {
    setAuth(!auth);
    if (!auth) {
      handleClose();
    }
  };

  const unauthenticated = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem',
        borderRadius: '5px',
      }}
    >
      <IconButton
        sx={{
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          marginRight: '0.6rem',
        }}
        aria-label="user-icon"
      >
        <PersonIcon />
      </IconButton>
      <Typography variant="body1">
        <a href="#" onClick={changeAuth} style={{ color: 'black', textDecoration: 'none' }}>
          Login
        </a>{' '}
        |{' '}
        <a href="#" style={{ color: 'black', textDecoration: 'none' }}>
          Register
        </a>
      </Typography>
    </Box>
  );

  const authenticated = (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center', 
      padding: '0.5rem',
      borderRadius: '5px',
    }}>
      <Avatar sx={{ borderRadius: '10px' }}>Ö</Avatar>
      <Box sx={{ marginLeft: '8px' }}>Mikä</Box>
      <IconButton
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleClick}
        aria-label="expand more"
      >
        <ExpandMoreIcon />
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={changeAuth}>Log Out</MenuItem>
      </Menu>
    </Box>
  );

  return (
    <AppBar
      sx={{
        background: theme.palette.background.default,
        color: theme.palette.primary.main
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            gap: '2.5rem'
          }}
        >
          <Typography variant='h6'>
            <NavLink
              to="/"
              onClick={() => handleNavigation('/', 'Home')}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              DecisionMaker
            </NavLink>
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-around', gap: '1.75rem' }}>
            {navItems.slice(1).map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => handleNavigation(item.path, item.label)}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Button>{item.label}</Button>
              </NavLink>
            ))}
          </Box>

          <Box>
            {auth ? authenticated : unauthenticated}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
