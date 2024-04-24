import React from 'react';
import logo from './logo.svg';
import './App.css';
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import Sidebar from './components/Sidebar';


function App() {
  return (
    <ThemeProvider theme={theme}>
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            DECISION MAKING APP
          </h1>
          <h2>Testing</h2>
     
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <div>
        <Sidebar/>
      </div>

    </ThemeProvider>
  );
}

export default App;
