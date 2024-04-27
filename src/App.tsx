import React from 'react';
import logo from './logo.svg';
import './App.css';
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import Sidebar from './components/Sidebar';
import CustomButton from './components/Button';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';



function App() {
  const handleClick = () => {
    console.log("Button clicked!");}
  return (
    <ThemeProvider theme={theme}>
      
      <div className="App">
        <header className="App-header">
          <h1>
            DECISION MAKING APP
          </h1>
          <h2>Testing</h2>
     
          <CustomButton onClick={handleClick} startIcon={<PersonOutlineSharpIcon />}>
            Hello</CustomButton>        
        </header>
      </div>
      <div>
        <Sidebar/>
      </div>

    </ThemeProvider>
  );
}

export default App;