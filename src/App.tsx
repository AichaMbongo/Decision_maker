import React from 'react';
import logo from './logo.svg';
import './App.css';
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HeroSection from './pages/HeroSection';
import { Stack, Button, } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Layout from './components/Layout'
import newCriteria from './pages/newCriteria';
import otherNewCriteria from './pages/otherNewCriteria';
import PreviousDecision from './pages/PreviousDecision';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Theme } from '@mui/material';
import landing from './pages/Landing';


function App() {
  interface HeroSectionProps {
    theme: Theme;
  } 
  return (
    
      <Layout>
        <div className="App">
         
          
          <HeroSection />
                <div>
          
          </div>
          <Stack sx={{ bgcolor: 'white', mt: "10px", p: 2 }} direction="row" gap={3}>
            <NavLink to={'/'} style={{ textDecoration: 'none' }}>
              <Stack width={80} alignItems="center">
                <Button variant="contained" sx={{ bgcolor: 'secondary.main' }}>Main</Button>
              </Stack>
            </NavLink>
            <NavLink to={'/newCriteria'} style={{ textDecoration: 'none' }}>
              <Stack alignItems="center">
                <Button variant="contained" sx={{ bgcolor: 'secondary.main' }}>New Criteria</Button>
              </Stack>
            </NavLink>
            <NavLink to={'/othernewCriteria'} style={{ textDecoration: 'none' }}>
              <Stack alignItems="center">
                <Button variant="contained" sx={{ bgcolor: 'secondary.main' }}>Other New Criteria</Button>
              </Stack>
            </NavLink>
            <NavLink to={'/decisionModel'} style={{ textDecoration: 'none' }}>
              <Stack alignItems="center">
                <Button variant="contained" sx={{ bgcolor: 'secondary.main' }}>Decision Model</Button>
              </Stack>
            </NavLink>
             <NavLink to={'/newOption'} style={{ textDecoration: 'none' }}>
              <Stack alignItems="center">
                <Button variant="contained" sx={{ bgcolor: 'secondary.main' }}>New Option</Button>
              </Stack>
            </NavLink>
          </Stack>

         
        </div> 

        
      </Layout>
   
  );
}

export default App;



          {/* <PreviousDecision /> */}
