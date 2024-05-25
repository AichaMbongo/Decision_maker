import { Box, Container, Stack } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Layout from '../components/Layout';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import BackButton from '../components/BackButton';
import { NavLink } from 'react-router-dom';
import CustomButton from '../components/Button';
import { useBreadcrumbs } from '../context/BreadcrumbsProvider';

const CriteriaPage = () => {
    // Functions for handling criteria addition and deletion

    const options = ["Cost", "Safety", "Maintenance"];
    const { handleNavigation } = useBreadcrumbs();
    const EnterOption = () => {
        handleNavigation('/NewOption', 'New Option');
    };

    return (
        <Layout>
            <Stack>
                <div style={{ marginLeft: '30px' }}> <BackButton /></div>
            </Stack>
            <Container
                sx={{
                    display: '100vh',
                    paddingTop: '2',
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        height: '80vh',
                        width: '100%',
                        gap: 1,
                        padding: 2,
                        boxShadow: 3, // Added shadow effect
                        backgroundColor: 'white',
                        gridTemplate: 
                        `"result result result result option"
                        "result result result result ranking"
                        "result result result result ranking"
                        ". . save save ranking"
                        `,
                    }}
                >
                    <Box
                        sx={{
                            gridArea: "result"
                        }}
                    >
                        {/* Result Area */}
                    </Box>
                    <Box
                        sx={{
                            gridArea: "option",
                            
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: 3, // Added shadow effect
                            backgroundColor: 'white',
                        }}
                    >
                        <Button variant="contained">Add Criteria</Button>  
                    </Box>
                    <Box
                        sx={{
                            gridArea: "ranking",
                           
                            borderRadius: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            padding: 2.5,
                            boxShadow: 3, // Added shadow effect
                            backgroundColor: 'white',
                        }}
                    >
                        <Typography variant="body1" alignSelf="flex-start" sx={{ fontWeight: '800' }}>
                            Criteria
                        </Typography>
                        {options.map((option) => (
                            <Stack key={option} gap={3} direction="column" justifyContent="center">
                                <Stack gap={2} direction="row" alignItems="center" justifyContent="flex-start">
                                    <AdsClickIcon style={{ fontSize: '56px', padding: '2' }} />
                                    <Stack>
                                        <Typography variant='body1'>{option}</Typography>
                                        <Button variant="contained">Edit Criteria</Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        ))}
                    </Box>
                    <Box sx={{ gridArea: "save" }}>
                        <NavLink to="/NewOption" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <CustomButton onClick={EnterOption}>
                                PROCEED
                            </CustomButton>
                        </NavLink>
                    </Box>
                </Box>
            </Container>
        </Layout>
    )
}

export default CriteriaPage;
