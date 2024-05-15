import React from 'react';
import logo from './logo.svg';
import '../App.css';
import theme from '../theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import HeroSection from './HeroSection';
import { Stack, Button, } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Layout from '../components/Layout'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Theme } from '@mui/material';


import otherNewOption from './OtherNewOption';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewCriteria from './NewCriteria';
import OtherNewCriteria from './OtherNewCriteria';
import DecisionModel from './DecisionModel';
import PreviousDecisions from './PreviousDecisions';
import NewDecision from './NewDecision';
import OtherNewOption from './OtherNewOption';
import NewOption from './NewOption';
import PreviousDecision from './PreviousDecision';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';  
import ResultsPage from './ResultsPage';
import CriteriaPage  from './CriteriaPage';
import { DecisionStateContext } from '../contexts/DecisionStateContext';




function Home() {
  interface HeroSectionProps {
    theme: Theme;
  } 
  return (
    <Layout>
    
      <div className="App">
        <HeroSection />
        <div>
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
            <NavLink to={'/othernewOption'} style={{ textDecoration: 'none' }}>
              <Stack alignItems="center">
                <Button variant="contained" sx={{ bgcolor: 'secondary.main' }}>Other New Option</Button>
              </Stack>
            </NavLink>
            <NavLink to={'/newOption'} style={{ textDecoration: 'none' }}>
              <Stack alignItems="center">
                <Button variant="contained" sx={{ bgcolor: 'secondary.main' }}>New Option</Button>
              </Stack>
            </NavLink>
            <NavLink to={'/contactUs'} style={{ textDecoration: 'none' }}>
              <Stack alignItems="center">
                <Button variant="contained" sx={{ bgcolor: 'secondary.main' }}>Contact Us</Button>
              </Stack>
            </NavLink>

            <NavLink to={'/aboutUs'} style={{ textDecoration: 'none' }}>
              <Stack alignItems="center">
                <Button variant="contained" sx={{ bgcolor: 'secondary.main' }}>About Us</Button>
              </Stack>
            </NavLink>
          </Stack>
        </div>
      </div>
    </Layout>
    
  );
}

export default Home;