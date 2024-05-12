import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewCriteria from './pages/newCriteria';
import OtherNewCriteria from './pages/otherNewCriteria';
import DecisionModel from './pages/DecisionModel';
import LandingPage from './pages/Landing';

import OtherNewOption from './pages/otherNewOption';
import NewOption from './pages/newOption';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/newOption' element={<NewOption />} />
        <Route path='/newCriteria' element={<NewCriteria />} />
        <Route path='/othernewCriteria' element={<OtherNewCriteria />} />
        <Route path='/decisionModel' element={<DecisionModel/>} />
        <Route path='/Landing' element={<LandingPage/>} />
        <Route path='/othernewOption' element={<OtherNewOption/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
