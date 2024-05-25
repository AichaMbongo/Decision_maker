import React from 'react'
import Header from '../components/Header'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import BackButton from '../components/BackButton';
import { Button, Stack, Typography } from '@mui/material';
import TitleSection from '../components/Title-section';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Footer from '../components/Footer';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router-dom';
import CustomButton from '../components/Button';
import Layout from '../components/Layout';
import { useBreadcrumbs } from '../context/BreadcrumbsProvider';


// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//     event.preventDefault();
//     console.info('You clicked a breadcrumb.');
// }

const handleClick = () => {
    console.log("Button is Clicked");
  }
  



const NewOption = () => {
    const { handleNavigation } = useBreadcrumbs();
    const addOtherNewOption = () => {
      handleNavigation('/OtherNewOption', 'Other New Option');
    };
    return (
        <Layout>
            <div style={{marginLeft:'30px'}}> <BackButton /></div>
            <Stack direction="column" spacing={2} alignItems="center" justifyContent="center" >
            <Stack className="stack-container">
                
                <div><Typography variant='h4' align="center">Enter Your Option</Typography></div>
           
            <Stack direction="column" spacing={2} alignItems="center" justifyContent="center" style={{ marginBottom: '154px' , padding:3, marginTop:'10px' }}>
                < FormatListBulletedIcon style={{ fontSize: '56px', padding: '2' }} />
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="filled-basic" label="ie. BMW, Mercedes" variant="filled" />
                </Box>
                
                <NavLink to="/otherNewOption" style={{ textDecoration: 'none', color: 'inherit' }}>

                    <CustomButton onClick={addOtherNewOption}>
                    PROCEED
                    </CustomButton>
                </NavLink>
                </Stack>
            </Stack>
            </Stack>
        </Layout>

    )
}

export default NewOption;