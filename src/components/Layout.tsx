import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import theme from '../theme/theme';
import { ThemeProvider } from '@emotion/react';
import BreadCrumbs_component from './Breadcrumbs';
import { Container } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className='layout'>
        {!isLandingPage && (
          <Container maxWidth='xl' className='bread-container'>
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
