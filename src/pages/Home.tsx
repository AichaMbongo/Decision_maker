import '../App.css';
import HeroSection from '../components/HeroSection';
import { Stack, Button, } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Layout from '../components/Layout'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Theme } from '@mui/material';






function Home() {
  interface HeroSectionProps {
    theme: Theme;
  } 


  return (
    <Layout>
    
      <div className="App">
        <HeroSection />
       
      </div>
    </Layout>
    
  );
}

export default Home;