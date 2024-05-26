import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Fab from '@mui/material/Fab';
import React from 'react';
import { useBreadcrumbs } from '../context/BreadcrumbsProvider';

const BackButton: React.FC = () => {
  const { handleBackNavigation } = useBreadcrumbs();

  return (
    <Fab  aria-label="back" onClick={handleBackNavigation}>
      <ArrowBackIosNewRoundedIcon />
    </Fab>
  );
};

export default BackButton;
