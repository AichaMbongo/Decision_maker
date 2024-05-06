import React from 'react';
import logo from './logo.svg';
import './App.css';
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import Sidebar from './components/Sidebar';
import CustomButton from './components/Button';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import Header from './components/Header';
import ProfileCard from './components/avatarCard';
import Menusmall from './components/Menu/MenuSmall';
import NavbarMenu from './components/Menu/NavbarMenu';
import Icon from './components/Icon';
import Search from '@mui/icons-material/Search';
import User from './components/Users';
import BasicTextField from './components/input-field';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import LinearColor from './components/LinearColor';


function App() {
  const handleClick = () => {
    console.log("Button clicked!");}


    const profile = {
      name: 'John Doe',
      role: 'Software Engineer',
      avatarUrl: 'https://example.com/avatar.jpg',
      profileUrl: 'https://example.com/profile', // Add profileUrl property
    };

    // const fields = [
    //   { id: 'outlined-basic', label: 'Outlined', variant: 'outlined', defaultValue: '' },
    //   { id: 'filled-basic', label: 'Filled', variant: 'filled', defaultValue: '' },
    //   { id: 'standard-basic', label: 'Standard', variant: 'standard', defaultValue: '' },
    // ];
  
    interface Field {
      id: string;
      label: string;
      variant: 'outlined' | 'filled' | 'standard';
      defaultValue?: string;
  }

    const fields: Field[] = [
      { id: 'outlined-basic', label: 'Outlined', variant: 'outlined', defaultValue: '' },
      { id: 'filled-basic', label: 'Filled', variant: 'filled', defaultValue: '' },
      { id: 'standard-basic', label: 'Standard', variant: 'standard', defaultValue: '' },
  ];
  
  

  return (
    <ThemeProvider theme={theme}>
      
      
      <div className="App">
        <>

        <Header/>
        <HeroSection/>
             
        </>
      </div>
      

    </ThemeProvider>
  );
}

export default App;