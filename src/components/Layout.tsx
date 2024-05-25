import React from 'react';
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
  return (
    <ThemeProvider theme={theme}>
      <Header />
    
      
      <div className='layout'>
      <Container maxWidth='xl' sx={{ marginTop: '5rem' }}>
      <BreadCrumbs_component />
      </Container>
      {children}
      </div> 
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;