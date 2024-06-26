import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import theme from "../theme/theme";
import { ThemeProvider } from "@emotion/react";
import BreadCrumbs_component from "./Breadcrumbs";
import { Container } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (location.state && location.state.isAuthenticated) {
      setAuth(true);
    }
  }, [location.state]);

  // Determine if the current path is /login or /registration
  const hideHeaderAndBreadcrumbs =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <ThemeProvider theme={theme}>
      {!hideHeaderAndBreadcrumbs && <Header auth={auth} setAuth={setAuth} />}
      <div className="layout">
        {!isLandingPage && !hideHeaderAndBreadcrumbs && (
          <Container maxWidth="xl" className="bread-container">
            <BreadCrumbs_component />
          </Container>
        )}
        {children}
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
