import React from 'react';
import Header from '../components/Header';
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
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import CustomButton from '../components/Button';
import { NavLink } from 'react-router-dom';
import Layout from '../components/Layout';
import { useBreadcrumbs } from '../context/BreadcrumbsProvider';

// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//     event.preventDefault();
//     console.info('You clicked a breadcrumb.');
// }
const handleClick = () => {
    console.log("Button is Clicked");
  }

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));




const OtherNewOption = () => {
const { handleNavigation } = useBreadcrumbs();
const EvaluateOptions = () => {
  handleNavigation('/EvaluateOptionsPage', 'Evaluate Options');
};
    return (

        <Layout>
           
            <Stack>
                <div style={{ marginLeft: '30px' }}> <BackButton /></div>
            </Stack>
            <Stack direction="column" spacing={2} alignItems="center" justifyContent="center" >
            <Stack className="stack-container">
                <Typography variant='h4' align="center">Do you want to Add Another Option?</Typography>
                <PsychologyAltIcon style={{ fontSize: '56px', padding: '2' }} />
                {/* <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="filled-basic" label="Type in something...." variant="filled" />
                </Box> */}

                <Stack sx={{ p: 1 }} gap={6} direction="row" alignItems="center" justifyContent="center" style={{ marginBottom: '30px' }}>

                <NavLink to="/newOption" style={{ textDecoration: 'none', color: 'inherit' }}>

                <CustomButton onClick={handleClick} >
                Yes
                </CustomButton>
                </NavLink>

                <NavLink to="/EvaluateOptionsPage" style={{ textDecoration: 'none', color: 'inherit' }}>

                <CustomButton onClick={EvaluateOptions} >
                No
                </CustomButton>
                </NavLink>
                    
                </Stack>
            </Stack>
            </Stack>
            <Stack sx={{ p: 1 }} gap={4} direction="column">
                <Grid container padding={4} rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <Item>
                            <Stack gap={2} direction="row" alignItems="center" justifyContent="center">
                                <AdsClickIcon style={{ fontSize: '56px', padding: '2' }} />
                                <Stack>
                                    <Typography variant='body1'>Option 1</Typography>
                                    <Button variant="contained">Edit Option</Button>
                                </Stack>
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <Stack gap={2} direction="row" alignItems="center" justifyContent="center">
                                <AdsClickIcon style={{ fontSize: '56px', padding: '2' }} />
                                <Stack>
                                    <Typography variant='body1'>Option 2</Typography>
                                    <Button variant="contained">Edit Option</Button>
                                </Stack>
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <Stack gap={2} direction="row" alignItems="center" justifyContent="center">
                                <AdsClickIcon style={{ fontSize: '56px', padding: '2' }} />
                                <Stack>
                                    <Typography variant='body1'>Option 3</Typography>
                                    <Button variant="contained">Edit Option</Button>
                                </Stack>
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <Stack gap={2} direction="row" alignItems="center" justifyContent="center">
                                <AdsClickIcon style={{ fontSize: '56px', padding: '2' }} />
                                <Stack>
                                    <Typography variant='body1'>Option 4</Typography>
                                    <Button variant="contained">Edit Option</Button>
                                </Stack>
                            </Stack>
                        </Item>
                    </Grid>
                </Grid>
            </Stack>
            
        
        </Layout>
    )
}

export default OtherNewOption;