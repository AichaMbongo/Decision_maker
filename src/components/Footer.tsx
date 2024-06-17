import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#C3C3C3',
        padding: '1rem',
        borderTop: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        
      }}
    >

    <Box sx={{ paddingLeft: '10px' }}>
    <a href="/" style={{ color: 'black', textDecoration: 'none' }}>Decision Maker</a> 
        {/* <a href="/terms-conditions" style={{ color: 'black', textDecoration: 'none' }}>Terms & Conditions</a> */}
      </Box>
      
      {/* <Box sx={{ marginLeft: 'auto' }}>
        <Typography variant="body2">Decision Maker</Typography>
      </Box> */}

      <Box sx={{ paddingLeft: '150px' }}>
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} All rights reserved
      </Typography>
      </Box>
      
    </Box>
  );
};

export default Footer;
