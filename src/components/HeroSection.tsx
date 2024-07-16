import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  useMediaQuery,
  styled,
} from "@mui/material";
import CustomButton from "./Button";
import { NavLink } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import theme from "../theme/theme";
import Lottie from "react-lottie-player";
import animationData from "../animations/success.json";

const HeroContent: React.FC<any> = ({
  isSmallScreen,
  goToNewDecision,
}) => {
  const StyledIcon = styled("span")({
    color: isSmallScreen ? theme.palette.primary.main : "#337357",
  });

  return (
    <Box sx={{ padding: isSmallScreen ? 2 : 3 }}>
      <Typography
        variant={isSmallScreen ? "subtitle1" : "h3"}
        gutterBottom
        color={isSmallScreen ? "white" : theme.typography.h1.color}
        textAlign="left"
      >
        DecisionMaker, The Ultimate Decision-Making Companion
      </Typography>
      <Typography
        variant={isSmallScreen ? "h1" : "subtitle1"}
        gutterBottom
        color={isSmallScreen ? "white" : theme.typography.h2.color}
        textAlign="left"
      >
        Simplify Complex Choices, Achieve Your Goals with Ease
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        color={isSmallScreen ? "white" : theme.palette.text.primary}
        style={{ marginTop: 20 }}
        textAlign="left"
      >
        Key Features:
      </Typography>
      <Box>
        <Box display="flex" alignItems="left" marginBottom={1}>
          <StyledIcon>
            <CheckCircleIcon className="animate__animated animate__bounce" />
          </StyledIcon>
          <Typography
            variant={isSmallScreen ? "body1" : "subtitle1"}
            color={isSmallScreen ? "white" : theme.palette.text.primary}
          >
            Intuitive Decision Wizard
          </Typography>
        </Box>
        <Box display="flex" alignItems="left" marginBottom={1}>
          <StyledIcon>
            <SettingsIcon className="animate__animated animate__bounce" />
          </StyledIcon>
          <Typography
            variant={isSmallScreen ? "body1" : "subtitle1"}
            color={isSmallScreen ? "white" : theme.palette.text.primary}
          >
            Customizable Decision Criteria
          </Typography>
        </Box>
        <Box display="flex" alignItems="left" marginBottom={1}>
          <StyledIcon>
            <AnalyticsIcon className="animate__animated animate__bounce" />
          </StyledIcon>
          <Typography
            variant={isSmallScreen ? "body1" : "subtitle1"}
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
              <CustomButton
                onClick={goToNewDecision}
                disabled={false}
                width="100%"
              >
                Get Started
              </CustomButton>
            </NavLink>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const HeroSection: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isTabletScreen = useMediaQuery("(min-width:600px) and (max-width:1024px)");
  const isLargeScreen = useMediaQuery("(min-width:1024px)");

  const { handleNavigation } = useBreadcrumbs();
  const goToNewDecision = () => {
    handleNavigation("/NewDecision", "New Decision");
  };

  return (
    <Box sx={{ height: "100vh", backgroundColor: "#81c784" }}>
      <Grid container style={{ height: "100%" }}>
        {(isSmallScreen || isTabletScreen) ? (
          // Stacked layout for small screens and tablets
          <>
            <Grid item xs={12} style={{ height: "50%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Lottie
                  loop
                  animationData={animationData}
                  play
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} style={{ height: "50%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <HeroContent
                  isSmallScreen={isSmallScreen}
                  isTabletScreen={isTabletScreen}
                  isLargeScreen={isLargeScreen}
                  goToNewDecision={goToNewDecision}
                />
              </Box>
            </Grid>
          </>
        ) : (
          // Side-by-side layout for larger screens
          <>
            <Grid item xs={12} md={6} style={{ height: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Lottie
                  loop
                  animationData={animationData}
                  play
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} style={{ height: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <HeroContent
                  isSmallScreen={isSmallScreen}
                  isTabletScreen={isTabletScreen}
                  isLargeScreen={isLargeScreen}
                  goToNewDecision={goToNewDecision}
                />
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default HeroSection;
