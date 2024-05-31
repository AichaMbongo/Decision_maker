import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, useMediaQuery, styled } from '@mui/material';
import CustomButton from './Button';
import { NavLink } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useBreadcrumbs } from '../contexts/BreadcrumbsProvider';

interface Field {
  id: string;
  label: string;
  variant: 'outlined' | 'filled' | 'standard';
  defaultValue?: string;
}

const useIsLargeScreen = () => {
  return useMediaQuery('(min-width:1200px)');
};

const HeroSection: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const fields: Field[] = [{ id: 'decision_name', label: 'E.g. "To buy a car"', variant: 'filled', defaultValue: '' }];

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const heroImage = isSmallScreen ? 'hero-image-small' : 'hero-image-large';
  const isLargeScreen = useMediaQuery('(min-width:960px)');
  const isMediumScreen = useMediaQuery('(min-width: 960px) and (max-width: 1200px)');

  // Define a styled component for the icons with the desired color
  const StyledIcon = styled('span')({
    color: '#337357', // Use the primary color from the theme
  });
  const { handleNavigation } = useBreadcrumbs();
  const goToNewDecision = () => {
    handleNavigation('/NewDecision', 'New Decision');
  };

  const goToAboutUs = () => {
    handleNavigation('/AboutUs', 'About Us');
  };

  const goToLogin = () => {
    handleNavigation('/login', 'Login');
  };

  const goToAboutRegister = () => {
    handleNavigation('/register', 'Register');
  };


  return (

    <Grid item xs={12} md={8} lg={6}>
      <Box
        className={`hero-section ${heroImage}`}
        sx={{
          opacity: 0,
          animation: 'fadeIn 1s ease forwards', // Apply fade-in animation
        }}
      >
        {/* Your content remains the same */}
        <Grid
          container
          justifyContent={isLargeScreen ? 'left' : 'center'}
          textAlign={isSmallScreen ? 'center' : 'left'} // Align text to center on small screens
        >
          <Grid item xs={12} md={8} lg={5} ml={isLargeScreen ? 10 : 0}>
            <Box textAlign="left" mt={isSmallScreen ? 5 : isMediumScreen ? 7 : 10} sx={{ padding: isSmallScreen || isMediumScreen ? '16px' : '0' }}>
              <Typography variant="h1" gutterBottom>
                DecisionMaker, The Ultimate Decision-Making Companion
              </Typography>
              <Typography variant="h2" gutterBottom>
                Simplify Complex Choices, Achieve Your Goals with Ease
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Key Features:
              </Typography>
              <Grid display="flex" alignItems="center" marginBottom={1} lg={12}>
                <Grid item xs={12} md={8} lg={6}>
                  <Box display="flex" alignItems="center" marginBottom={1}>
                    <StyledIcon>
                      <CheckCircleIcon />
                    </StyledIcon>
                    Intuitive Decision Wizard
                  </Box>
                  <Grid direction="column" justifyContent="center"></Grid>
                  <Box display="flex" alignItems="center" marginBottom={1}>
                    <StyledIcon>
                      <SettingsIcon />
                    </StyledIcon>
                    Customizable Decision Criteria
                  </Box>
                  <Grid direction="column" justifyContent="center"></Grid>
                  <Box display="flex" alignItems="center" marginBottom={1}>
                    <StyledIcon>
                      <CompareArrowsIcon />
                    </StyledIcon>
                    Comparison Tools
                  </Box>
                  <Grid direction="column" justifyContent="center"></Grid>
                  <Box display="flex" alignItems="center" marginBottom={1}>
                    <StyledIcon>
                      <AnalyticsIcon />
                    </StyledIcon>
                    Data Analysis
                  </Box>
                </Grid>
              </Grid>
              <Box justifyContent="center" mt={5}>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={4}>

                    <NavLink to="/newDecision" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <CustomButton onClick={goToNewDecision} disabled={false} width="100%">
                        Get Started
                      </CustomButton>
                    </NavLink>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <NavLink to="/aboutUs" style={{ textDecoration: 'none', color: 'inherit' }}>

                      <CustomButton variant="outlined" onClick={goToAboutUs} disabled={false} width="100%">
                        About Us
                      </CustomButton>
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default HeroSection;
