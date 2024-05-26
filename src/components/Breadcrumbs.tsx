
// import React from 'react'
// import {Link, Typography} from '@mui/material'

// import Breadcrumbs from '@mui/material/Breadcrumbs';

// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//     event.preventDefault();
//     console.info('You clicked a breadcrumb.');
// }

// const BreadCrumbs_component = () => {
//     return (
//         <div role="presentation" onClick={handleClick} style={{ marginLeft: '90px' }}>
//             <Breadcrumbs aria-label="breadcrumb">
//                 <Link underline="hover" color="inherit" href="/">
//                     Home
//                 </Link>
//                 <Link
//                     underline="hover"
//                     color="inherit"
//                     href="/"
//                 >
//                     Decision
//                 </Link>
//                 <Link
//                     underline="hover"
//                     color="inherit"
//                     href="/decisionModel"
//                 >
//                     Decision Model
//                 </Link>
//                 <Typography color="text.primary">AHP Model</Typography>
//                 <Typography color="text.primary">New Criteria</Typography>
//             </Breadcrumbs>
//         </div>
//     )
// }

// export default BreadCrumbs_component


import React from 'react';
import { Breadcrumbs, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useBreadcrumbs } from '../context/BreadcrumbsProvider';

const BreadCrumbs_component: React.FC = () => {
  const { breadcrumbs, updateBreadcrumbs } = useBreadcrumbs();
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    updateBreadcrumbs(path);
    navigate(path);
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginLeft: '1rem' }}>
      {breadcrumbs.map((crumb) => (
        <Link
          key={crumb.path}
          color="inherit"
          style={{ textDecoration: 'none', cursor: 'pointer' }}
          onClick={() => handleClick(crumb.path)}
        >
          {crumb.label}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default BreadCrumbs_component;
