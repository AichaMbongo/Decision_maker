import React from "react";
import { Breadcrumbs, Link, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import { useTheme } from "@mui/material/styles";

const BreadCrumbs_component: React.FC = () => {
  const { breadcrumbs, updateBreadcrumbs } = useBreadcrumbs();
  const navigate = useNavigate();
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (path: string) => {
    updateBreadcrumbs(path);
    navigate(path);
  };

  // Function to render breadcrumbs, with condensing logic
  const renderBreadcrumbs = () => {
    if (isXsScreen) {
      // Hide breadcrumbs on very small screens
      return null;
    } else if (isSmScreen) {
      // Condense breadcrumbs on small screens
      if (breadcrumbs.length <= 4) {
        return breadcrumbs.map((crumb) => (
          <Link
            key={crumb.path}
            color="inherit"
            style={{ textDecoration: "none", cursor: "pointer" }}
            onClick={() => handleClick(crumb.path)}
          >
            {crumb.label}
          </Link>
        ));
      }

      return [
        <Link
          key={breadcrumbs[0].path}
          color="inherit"
          style={{ textDecoration: "none", cursor: "pointer" }}
          onClick={() => handleClick(breadcrumbs[0].path)}
        >
          {breadcrumbs[0].label}
        </Link>,
        <Typography key="ellipsis" color="text.primary">
          ...
        </Typography>,
        ...breadcrumbs.slice(-2).map((crumb) => (
          <Link
            key={crumb.path}
            color="inherit"
            style={{ textDecoration: "none", cursor: "pointer" }}
            onClick={() => handleClick(crumb.path)}
          >
            {crumb.label}
          </Link>
        )),
      ];
    } else {
      // Render breadcrumbs normally on larger screens
      if (breadcrumbs.length <= 6) {
        return breadcrumbs.map((crumb) => (
          <Link
            key={crumb.path}
            color="inherit"
            style={{ textDecoration: "none", cursor: "pointer" }}
            onClick={() => handleClick(crumb.path)}
          >
            {crumb.label}
          </Link>
        ));
      }

      return [
        <Link
          key={breadcrumbs[0].path}
          color="inherit"
          style={{ textDecoration: "none", cursor: "pointer" }}
          onClick={() => handleClick(breadcrumbs[0].path)}
        >
          {breadcrumbs[0].label}
        </Link>,
        <Typography key="ellipsis" color="text.primary">
          ...
        </Typography>,
        ...breadcrumbs.slice(-4).map((crumb) => (
          <Link
            key={crumb.path}
            color="inherit"
            style={{ textDecoration: "none", cursor: "pointer" }}
            onClick={() => handleClick(crumb.path)}
          >
            {crumb.label}
          </Link>
        )),
      ];
    }
  };

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ marginLeft: "1rem", backgroundColor: "transparent" }}
    >
      {renderBreadcrumbs()}
    </Breadcrumbs>
  );
};

export default BreadCrumbs_component;
