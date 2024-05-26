import React from 'react'
import HeroSection from './HeroSection'
import { Box, Grid, Typography, Stack } from '@mui/material'
import Layout from '../components/Layout'
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import CustomButton from '../components/Button';
import BasicTextField from '../components/input-field';
import {Field} from '../components/interfaces/InputFieldProps';
import { NavLink } from 'react-router-dom';
import { useBreadcrumbs } from '../context/BreadcrumbsProvider';

//add some temporary links here to enable viewing of pages


const NewDecision: React.FC = () =>  {

const fields: Field[] = [
  { id: 'filled-basic', label: 'E.g. "To Buy a Car"', variant: 'filled', defaultValue: '' },
]

const handleClick = () => {
  console.log("Button is Clicked");
}

const { handleNavigation } = useBreadcrumbs();
const EnterNewCriteria = () => {
  handleNavigation('/newCriteria', 'New Criteria');
};

  return (
    
    <Layout >
      <Stack direction="column" spacing={2} alignItems="center" textAlign="center" justifyContent="center" style={{ marginBottom: '154px' , padding:3, marginTop:'10px' }}>
      <Stack className="stack-container">      
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
      <Box mt={2} width={100} alignItems="center">
      


      </Box>
      </Grid>
      
      <NavLink to="/newCriteria" style={{ textDecoration: 'none', color: 'inherit' }}>

<CustomButton onClick={EnterNewCriteria}>
  PROCEED
  </CustomButton>
  </NavLink>
  </Stack>    
  </Stack>
    </Layout>
   
  )
}

export default NewDecision

