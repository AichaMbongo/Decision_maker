import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
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
import { DecisionStateContext } from './contexts/DecisionStateContext';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  
    <BrowserRouter>

      <App/>
      {/* <Routes>
        <Route path='/' element={<App />} />
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
        </Routes> */}

    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
