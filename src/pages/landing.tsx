import React from 'react'
import HeroSection from './HeroSection'
import { Box, Grid, Typography, Stack } from '@mui/material'
import Layout from '../components/Layout'
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import CustomButton from '../components/Button';
import BasicTextField from '../components/input-field';
import {Field} from '../components/interfaces/InputFieldProps';

//add some temporary links here to enable viewing of pages


const LandingPage: React.FC = () =>  {

const fields: Field[] = [
  { id: 'filled-basic', label: 'E.g. "To Buy a Car"', variant: 'filled', defaultValue: '' },
]

const handleClick = () => {
  console.log("Button is Clicked");
}

  return (
    
    <Layout >
      <Box className='hero-section'>
        <Grid lg={6}>
        <Box>
      <Typography variant='h3'>
Let us Begin With The End in Mind.
      </Typography>
      </Box>
      
      <Box>
      <Typography variant='h3'>
What is Your Goal?
      </Typography>
      </Box>
      <Box> 
        <GolfCourseIcon 
        sx={{
          fontSize: 40
        }}
        />
      </Box>
      <Box>
        <BasicTextField fields={fields} />
      </Box>
      <Box mt={2}>
        <CustomButton onClick={handleClick}>
          PROCEED
          </CustomButton>
      </Box>
      </Grid>
      </Box>

    </Layout>
   
  )
}

export default LandingPage

