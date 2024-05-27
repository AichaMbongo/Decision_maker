import React, { useState } from 'react'
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
import { DecisionStateContext } from '../contexts/DecisionStateContext';
import { useContext } from 'react';


// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//     event.preventDefault();
//     console.info('You clicked a breadcrumb.');
// }

const handleClick = () => {
    console.log("Button is Clicked");
  }
  


const NewOption = () => {
    const [option, setOption] = useState<string>("BMW")
    const {decisionState, setDecisionState} = useContext(DecisionStateContext);

    console.log("Decision State")
    console.log(decisionState)

    const options = decisionState.options

    options.push(option)



    const handleClick = () => {
        console.log("option")
    }

    return (
        <ThemeProvider theme={theme}>
            <Stack sx={{ p: 2 }} gap={9} direction="column">
                <div> <Header /></div>
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
                        <Typography color="text.primary">Options</Typography>
                    </Breadcrumbs>
                </div>
            </Stack>
            <Stack>
                <div style={{marginLeft:'30px'}}> <BackButton /></div>
                <div><Typography variant='h4' align="center">Enter Your Option</Typography></div>
            </Stack>
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

                    <CustomButton onClick={handleClick}>
                    PROCEED
                    </CustomButton>
                </NavLink>

            </Stack>
            <Footer />
        </ThemeProvider>

    )
}

export default NewOption;