import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type User = {
  name: string;
  avatar: string;
}

const User: React.FC<{ user: User }> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    
    <>
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
        <a href="/login" style={{ color: 'black', textDecoration: 'none' }}>
          Login
        </a>{' '}
        |{' '}
        <a href="/register" style={{ color: 'black', textDecoration: 'none' }}>
          Register
        </a>
      </Typography>
    </Box>

    <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center', 
        padding: '0.5rem',
        borderRadius: '5px',
        }}>
      <Avatar src={user.avatar} alt={user.name}  sx={{borderRadius: '10px'}}/>
      <Box sx={{ marginLeft: '8px' }}>{user.name}</Box>
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
        <MenuItem onClick={handleClose}>Log Out</MenuItem>
      </Menu>
    </Box>
    </>
  );
};

export default User;
