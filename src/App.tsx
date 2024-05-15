import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { DecisionStateContext } from './contexts/DecisionStateContext';
import DecisionState from './components/interfaces/DecisionState';

import Home from './pages/Home';
import NewOption from './pages/NewOption';
import NewCriteria from './pages/NewCriteria';
import OtherNewCriteria from './pages/OtherNewCriteria';
import DecisionModel from './pages/DecisionModel';
import NewDecision from './pages/NewDecision';
import OtherNewOption from './pages/OtherNewOption';
import PreviousDecision from './pages/PreviousDecision';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import ResultsPage from './pages/ResultsPage';
import CriteriaPage from './pages/CriteriaPage';

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

  return (
    <ThemeProvider theme={theme}>
      <DecisionStateContext.Provider value={{ decisionState, setDecisionState }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/newOption' element={<NewOption />} />
            <Route path='/newCriteria' element={<NewCriteria />} />
            <Route path='/otherNewCriteria' element={<OtherNewCriteria />} />
            <Route path='/decisionModel' element={<DecisionModel />} />
            <Route path='/newDecision' element={<NewDecision />} />
            <Route path='/otherNewOption' element={<OtherNewOption />} />
            <Route path='/previousDecision' element={<PreviousDecision />} />
            <Route path='/contactUs' element={<ContactUs />} />
            <Route path='/aboutUs' element={<AboutUs />} />
            <Route path='/resultsPage' element={<ResultsPage />} />
            <Route path='/criteriaPage' element={<CriteriaPage />} />
          </Routes>
        </BrowserRouter>
      </DecisionStateContext.Provider>
    </ThemeProvider>
  );
}

export default App;
