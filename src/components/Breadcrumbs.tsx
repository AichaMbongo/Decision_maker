import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useBreadcrumbs } from '../contexts/BreadcrumbsProvider';

const BreadCrumbs_component: React.FC = () => {
  const { breadcrumbs, updateBreadcrumbs } = useBreadcrumbs();
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    updateBreadcrumbs(path);
    navigate(path);
  };

  // Function to render breadcrumbs, with condensing logic
  const renderBreadcrumbs = () => {
    // If the number of breadcrumbs is 6 or less, render them normally
    if (breadcrumbs.length <= 6) {
      return breadcrumbs.map((crumb) => (
        <Link
          key={crumb.path}
          color="inherit"
          style={{ textDecoration: 'none', cursor: 'pointer' }}
          onClick={() => handleClick(crumb.path)}
        >
          {crumb.label}
        </Link>
      ));
    }

    // If there are more than 6 breadcrumbs, condense them
    return [
      // Show the first breadcrumb
      <Link
        key={breadcrumbs[0].path}
        color="inherit"
        style={{ textDecoration: 'none', cursor: 'pointer' }}
        onClick={() => handleClick(breadcrumbs[0].path)}
      >
        {breadcrumbs[0].label}
      </Link>,
      // Show an ellipsis in the middle
      <Typography key="ellipsis" color="text.primary">
        ...
      </Typography>,
      // Show the last 4 breadcrumbs
      ...breadcrumbs.slice(-4).map((crumb) => (
        <Link
          key={crumb.path}
          color="inherit"
          style={{ textDecoration: 'none', cursor: 'pointer' }}
          onClick={() => handleClick(crumb.path)}
        >
          {crumb.label}
        </Link>
      )),
    ];
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginLeft: '1rem', backgroundColor: 'transparent' }}>
      {renderBreadcrumbs()}
    </Breadcrumbs>
  );
};

export default BreadCrumbs_component;
