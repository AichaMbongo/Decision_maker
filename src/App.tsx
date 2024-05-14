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
import { useState } from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Theme } from '@mui/material';


import otherNewOption from './pages/OtherNewOption';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewCriteria from './pages/NewCriteria';
import OtherNewCriteria from './pages/OtherNewCriteria';
import DecisionModel from './pages/DecisionModel';
import PreviousDecisions from './pages/PreviousDecisions';
import NewDecision from './pages/NewDecision';
import OtherNewOption from './pages/OtherNewOption';
import NewOption from './pages/NewOption';
import PreviousDecision from './pages/PreviousDecision';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';  
import ResultsPage from './pages/ResultsPage';
import CriteriaPage  from './pages/CriteriaPage';
import DecisionStateProvider from './components/interfaces/DecisionStateProvider';
import { DecisionStateContext } from './contexts/DecisionStateContext';
import Home from './pages/Home';
import DecisionState from './components/interfaces/DecisionState';




function App() {
  const [decisionState, setDecisionState] = useState<DecisionState>({
    model: '',
    criteria: [],
    criteriaComparisons: [],
    options: [],
    optionComparisons: [],
});

  const updateDecisionState = (updatedProperties: Partial<DecisionState>) => {
    setDecisionState(prevState => ({
      ...prevState,
      ...updatedProperties,
    }));
  };

  interface HeroSectionProps {
    theme: Theme;
  } 
  return (
    <>
    <DecisionStateContext.Provider value={{ decisionState, setDecisionState}}>
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/NewOption' element={<NewOption />} />
        <Route path='/newCriteria' element={<NewCriteria />} />


        <Route path='/OtherNewCriteria' element={<OtherNewCriteria />} />
        <Route path='/DecisionModel' element={<DecisionModel/>} />
        <Route path='/NewDecision' element={<NewDecision/>} />
        <Route path='/OtherNewOption' element={<OtherNewOption/>} />
        <Route path='/PreviousDecision' element={<PreviousDecision/>}/>
        <Route path='/contactUs' element={<ContactUs/>} />
        <Route path='/aboutUs' element={<AboutUs/>} />
        <Route path='/resultsPage' element= {<ResultsPage/>}/>
        <Route  path='/criteriaPage' element = {<CriteriaPage/>}/>
        </Routes>

        </DecisionStateContext.Provider>
    </>
  );
}

export default App;