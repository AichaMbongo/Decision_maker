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
import Layout from '../components/Layout';



function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const newCriteria = () => {
    return (
      
        < Layout>
            <Stack sx={{ p: 2 }} gap={9} direction="column">
                
                <div role="presentation" onClick={handleClick} style={{marginLeft:'90px'}}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/"
                        >
                            Decision
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/decisionModel"
                        >
                            Decision Model
                        </Link>
                        <Typography color="text.primary">AHP Model</Typography>
                        <Typography color="text.primary">New Criteria</Typography>
                    </Breadcrumbs>
                </div>
            </Stack>
            <Stack>
                <div style={{marginLeft:'30px'}}> <BackButton /></div>
                <div><Typography variant='h3' align="center">Type in a New Criteria</Typography></div>
            </Stack>
            <Stack direction="column" spacing={2} alignItems="center" justifyContent="center" style={{ marginBottom: '78px' , padding:3, marginTop:'10px' }}>
                < FormatListBulletedIcon style={{ fontSize: '56px', padding: '2' }} />
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="filled-basic" label="ie. Cost, Comfort" variant="filled" />
                </Box>
                <Button variant="contained">Create New Criteria</Button>
            </Stack>
           
        
        </Layout>
       

    )
}

export default newCriteria