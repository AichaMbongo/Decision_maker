import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import { Button, Stack, Typography, Box, TextField, Breadcrumbs, Link, Grid, Paper, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import CustomButton from '../components/Button';
import Header from '../components/Header';
import TitleSection from '../components/Title-section';
import Footer from '../components/Footer';

const criteria = ["Cost", "Comfort", "Safety", "Good Insurance", "Comfy Seats", "Nice Speakers"];

const handleClick = () => {
    console.log("Button is Clicked");
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const OtherNewCriteria: React.FC = () => {
    const [formData, setFormData] = useState({ criteria: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //make edits here to add function
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Layout>
            <Stack sx={{ p: 2 }} gap={9} direction="column">
                <div role="presentation" onClick={handleClick} style={{ marginLeft: '90px' }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">Home</Link>
                        <Link underline="hover" color="inherit" href="/">Decision</Link>
                        <Link underline="hover" color="inherit" href="/decisionModel">Decision Model</Link>
                        <Typography color="text.primary">AHP Model</Typography>
                        <Link underline="hover" color="inherit" href="/othernewCriteria">More Criteria</Link>
                    </Breadcrumbs>
                </div>
            </Stack>
            <Stack>
                <div style={{ marginLeft: '30px' }}> <BackButton /></div>
            </Stack>

            <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
                <Typography variant='h3' align="center">Do you want to Add Another Criteria?</Typography>
                <PsychologyAltIcon style={{ fontSize: '56px', padding: '2' }} />
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '& > :not(style)': { m: 1, width: { xs: '100%', sm: '75%', md: '75%' } },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <FormControl variant="standard">
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField
                                name="criteria"
                                label="Search Criteria..."
                                variant="standard"
                                value={formData.criteria}
                                onChange={handleChange}
                            />
                        </Box>
                    </FormControl>
                </Box>
            </Stack>

            <Stack sx={{ p: 1 }} gap={4} direction="column">
                <Grid container padding={4} rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {criteria.map((crit, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Item>
                                <Stack gap={2} direction="row" alignItems="center" justifyContent="center">
                                    <AdsClickIcon style={{ fontSize: '56px', padding: '2' }} />
                                    <Stack>
                                        <Typography variant='body1'>{crit}</Typography>
                                        <Button variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
                                    </Stack>
                                </Stack>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Stack>

            <Stack sx={{ p: 1 }} gap={6} direction="row" alignItems="center" justifyContent="center" style={{ marginBottom: '30px' }}>
                <NavLink to="/newCriteria" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CustomButton onClick={handleClick}>Yes</CustomButton>
                </NavLink>
                <NavLink to="/EvaluateCriteria" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CustomButton onClick={handleClick}>No</CustomButton>
                </NavLink>
            </Stack>
        </Layout>
    );
};

export default OtherNewCriteria;
