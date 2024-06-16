import React from 'react';
import Header from '../components/Header';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import BackButton from '../components/BackButton';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Footer from '../components/Footer';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Layout from '../components/Layout';

function AboutUs() {

    function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    return (
        <Layout>
            <Stack  direction="row" spacing={65} style={{margin:'2vh'}} >
                <div style={{ marginLeft: '30px' }}> <BackButton /></div>
                <Typography variant="h4" gutterBottom>
                    About Us
                </Typography>
            </Stack>
            <Stack direction="column" spacing={1} alignItems="center" textAlign="center" justifyContent="center" style={{ marginBottom: '154px', padding: 3, marginTop: '10px' }}>

                <Box className="stack-container">
                    <Typography color="primary" variant="h5" gutterBottom>
                        We pay attention to your needs and help you make the best decisions
                    </Typography>
                    <Stack direction="row" spacing={4}>
                        <Typography variant="body1" sx={{ flex: 1, textAlign: 'left' }}>
                            <br /> Welcome to Decision Maker, a groundbreaking application developed for project management educators
                            to revolutionize the learning experience of complex project management methodologies. <br /> <br /> {''}
                            Our mission is to make these processes more accessible, engaging, and enjoyable.Decision Maker assists users in making well-informed decisions,
                            whether buying a car, selecting a technological solution, or choosing an investment idea, by implementing decision models like Forced Choice,
                            Analytic Hierarchy Process (AHP), and Multi-Criteria Analysis. <br /><br />

                            Designed for project managers, teams, and students, our user-friendly app allows for inputting and evaluating options and criteria across different
                            models, simplifying decision-making. <br /> <br />
                            Initially available as a web prototype, the cross-platform native
                            application for iOS, Android, and Windows aims for full release by May 31, 2025, targeting 1000 downloads.
                            Unique in its focus on user experience and simplicity.
                        </Typography>
                        <div style={{ flex: 1, height: '80vh', backgroundColor: 'lightgray', alignContent: 'center' }}>
                            <img
                                src="/decisionmaking.jpg"
                                alt="Light Bulb"
                                style={{ width: '70vh', height: '80vh', }}
                            />

                        </div>
                    </Stack>
                </Box>
            </Stack>



        </Layout>
    )
}

export default AboutUs;