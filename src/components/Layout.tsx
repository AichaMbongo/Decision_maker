import React from 'react';
import Header from './Header';
import Footer from './Footer';
import theme from '../theme/theme';
import { ThemeProvider } from '@emotion/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;