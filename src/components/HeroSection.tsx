import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  useMediaQuery,
  styled,
  CircularProgress,
} from "@mui/material";
import CustomButton from "./Button";
import { NavLink } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import Lottie from "react-lottie-player";
import animationData from "../animations/success.json";
import "animate.css";
import theme from "../theme/theme";

interface Field {
  id: string;
  label: string;
  variant: "outlined" | "filled" | "standard";
  defaultValue?: string;
}

const useIsLargeScreen = () => {
  return useMediaQuery("(min-width:1200px)");
};

const HeroSection: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const fields: Field[] = [
    {
      id: "decision_name",
      label: 'E.g. "To buy a car"',
      variant: "filled",
      defaultValue: "",
    },
  ];

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isLargeScreen = useMediaQuery("(min-width:960px)");
  const isMediumScreen = useMediaQuery(
    "(min-width: 600px) and (max-width: 960px)"
  );

  const StyledIcon = styled("span")({
    color: isSmallScreen ? theme.palette.primary.main : "#337357", // Change icon color for small screens
  });

  const { handleNavigation } = useBreadcrumbs();
  const goToNewDecision = () => {
    handleNavigation("/NewDecision", "New Decision");
  };

  const goToAboutUs = () => {
    handleNavigation("/AboutUs", "About Us");
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Styled component for animated button
  const AnimatedButton = styled(CustomButton)(({ theme }) => ({
    position: "relative",
    overflow: "hidden",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    animation: `$pulse 2s infinite`,
    "@keyframes pulse": {
      "0%": {
        transform: "scale(1)",
      },
      "50%": {
        transform: "scale(1.05)",
      },
      "100%": {
        transform: "scale(1)",
      },
    },
    "&:hover": {
      backgroundColor: isLargeScreen ? theme.palette.primary.main : undefined,
      boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75)", // Glow effect
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "300%",
      height: "300%",
      borderRadius: "50%",
      background: isLargeScreen ? theme.palette.primary.main : "transparent",
      opacity: 0.3,
      transition:
        "opacity 0.3s ease, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
      transform: "translate(-50%, -50%) scale(1)",
      zIndex: 0,
    },
    "&:hover::before": {
      opacity: 0,
      transform: "translate(-50%, -50%) scale(0)",
    },
  }));

  return (
    <Grid item xs={12}>
      <Box
        className={`hero-section ${
          isSmallScreen ? "hero-image-small" : "hero-image-large"
        }`}
        sx={{
          opacity: 0,
          animation: "fadeIn 1s ease forwards",
          padding: isSmallScreen ? 2 : 3,
        }}
      >
        <Grid
          container
          justifyContent={isLargeScreen ? "left" : "center"}
          textAlign={isSmallScreen ? "left" : "center"} // Center align text for small screens
        >
          <Grid item xs={12} md={8} lg={5} ml={isLargeScreen ? 10 : 0}>
            <Box
              textAlign="left"
              mt={isSmallScreen ? 5 : isMediumScreen ? 8 : 10}
              sx={{ padding: isSmallScreen || isMediumScreen ? "16px" : "0" }}
            >
              {isSmallScreen && (
                <Lottie
                  loop
                  animationData={animationData}
                  play
                  style={{ width: 350, height: 350 }}
                />
              )}

              <Typography
                variant={isSmallScreen ? "h4" : "h1"}
                gutterBottom
                color={isSmallScreen ? "white" : theme.typography.h1.color}
              >
                DecisionMaker, The Ultimate Decision-Making Companion
              </Typography>
              <Typography
                variant={isSmallScreen ? "h5" : "h2"}
                gutterBottom
                color={isSmallScreen ? "white" : theme.typography.h2.color}
              >
                Simplify Complex Choices, Achieve Your Goals with Ease
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                color={isSmallScreen ? "white" : theme.palette.text.primary}
              >
                Key Features:
              </Typography>

              <Box>
                <Box
                  display="flex"
                  alignItems="left"
                  justifyContent={isSmallScreen ? "left" : "flex-start"}
                  marginBottom={1}
                >
                  <StyledIcon>
                    <CheckCircleIcon className="animate__animated animate__bounce" />
                  </StyledIcon>
                  <Typography
                    variant={isSmallScreen ? "body1" : "h6"}
                    color={isSmallScreen ? "white" : theme.palette.text.primary}
                  >
                    Intuitive Decision Wizard
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="left"
                  justifyContent={isSmallScreen ? "left" : "flex-start"}
                  marginBottom={1}
                >
                  <StyledIcon>
                    <SettingsIcon className="animate__animated animate__bounce" />
                  </StyledIcon>
                  <Typography
                    variant={isSmallScreen ? "body1" : "h6"}
                    color={isSmallScreen ? "white" : theme.palette.text.primary}
                  >
                    Customizable Decision Criteria
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="left"
                  justifyContent={isSmallScreen ? "left" : "flex-start"}
                  marginBottom={1}
                >
                  <StyledIcon>
                    <CompareArrowsIcon className="animate__animated animate__bounce" />
                  </StyledIcon>
                  <Typography
                    variant={isSmallScreen ? "body1" : "h6"}
                    color={isSmallScreen ? "white" : theme.palette.text.primary}
                  >
                    Comparison Tools
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="left"
                  justifyContent={isSmallScreen ? "left" : "flex-start"}
                  marginBottom={1}
                >
                  <StyledIcon>
                    <AnalyticsIcon className="animate__animated animate__bounce" />
                  </StyledIcon>
                  <Typography
                    variant={isSmallScreen ? "body1" : "h6"}
                    color={isSmallScreen ? "white" : theme.palette.text.primary}
                  >
                    Data Analysis
                  </Typography>
                </Box>
              </Box>

              <Box justifyContent="center" mt={5}>
                <Grid
                  container
                  spacing={2}
                  justifyContent={isSmallScreen ? "center" : "flex-start"}
                >
                  <Grid item xs={12} sm={6} lg={4}>
                    <NavLink
                      to="/newDecision"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <AnimatedButton
                        onClick={goToNewDecision}
                        disabled={false}
                        width="100%"
                        style={{
                          backgroundColor: "white", // Change background color to transparent
                          color: isSmallScreen ? "green" : "initial", // Change text color to white for small screens
                        }}
                      >
                        Get Started
                      </AnimatedButton>
                    </NavLink>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <NavLink
                      to="/aboutUs"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <CustomButton
                        variant="outlined"
                        onClick={goToAboutUs}
                        disabled={false}
                        width="100%"
                        style={{
                          color: isSmallScreen
                            ? "white"
                            : theme.palette.text.primary,
                          borderColor: isSmallScreen
                            ? "white"
                            : theme.palette.text.primary,
                        }}
                      >
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
