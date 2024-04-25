import React from 'react';
import { Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

type IconButtonProps = {
  icon: JSX.Element;
}

const IconButton: React.FC<IconButtonProps> = ({ icon }) => (
  <Box
    sx={{
      width: '48px',
      height: '48px',
      borderRadius: '9px',
      backgroundColor: '#C3C3C3',
      border: '1px solid #ccc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '30px'
    }}
  >
    {icon}
  </Box>
);

const Icon = () => {
  return (
    <Box sx={{ display: 'flex', gap: '8px' }}>
      <IconButton icon={<FacebookIcon/>} />
      <IconButton icon={<FacebookIcon color="secondary" />} />
      <IconButton icon={<BookmarkBorderIcon/>} />
      <IconButton icon={<BookmarkBorderIcon color="secondary" />} />
    </Box>
  );
};

export default Icon;
