import React from 'react';
import logo from './logo.svg';
import './App.css';
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import Sidebar from './components/Sidebar';
import CustomButton from './components/Button';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import { Stack, Button, } from '@mui/material';
import { NavLink } from 'react-router-dom';



function App() {
  const handleClick = () => {
    console.log("Button clicked!");
  }
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

        <div>
          <Sidebar />
        </div>

        <div>
          <Stack sx={{ bgcolor: 'white', mt: "10px", p: 2 }} direction="row" gap={3}>

            <NavLink to={'/'} style={{ textDecoration: 'none' }}>
              <Stack width={80} alignItems="center">
                <Button variant="contained" sx={{ bgcolor: 'secondary.main' }}>Main</Button>
              </Stack>
            </NavLink>

            <NavLink to={'/newOption'} style={{ textDecoration: 'none' }}>
              <Stack alignItems="center">
                <Button variant="contained" sx={{ bgcolor: 'secondary.main' }}>New Option</Button>
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
          </Stack>
        </div>
      </div>

    </ThemeProvider>
  );
}

export default App;