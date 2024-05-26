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
             <Stack>
                <div style={{ marginLeft: '30px' }}> <BackButton /></div>
            </Stack>
           
            
            <Stack direction="column" spacing={2} alignItems="center" textAlign="center" justifyContent="center" style={{ marginBottom: '154px' , padding:3, marginTop:'10px' }}>

            <Box className="stack-container">
                
                        <Typography variant="h6" gutterBottom>
                        We pay attention to your needs and help you make the best decisions
                    </Typography>
                    <Stack direction="row" spacing={4}>
                        <Typography variant="body1" sx={{ flex: 1, textAlign: 'left' }}>
                        Welcome to Decision Maker, a groundbreaking application developed by project management educators 
                        from European universities to revolutionize the learning experience of complex project management
                         methodologies. Our mission is to make these processes more accessible, engaging, and enjoyable. 
                         Decision Maker assists users in making well-informed decisions, whether buying a car, selecting a
                          technological solution, or choosing an investment idea, by implementing decision models like Forced Choice,
                           Analytic Hierarchy Process (AHP), and Multi-Criteria Analysis. Designed for project managers, teams, and 
                           students, our user-friendly app allows for inputting and evaluating options and criteria across different
                            models, simplifying decision-making. Initially available as a web prototype, the cross-platform native 
                            application for iOS, Android, and Windows aims for full release by May 31, 2025, targeting 1000 downloads. 
                            Unique in its focus on user experience and simplicity, Decision Maker offers features like an evaluation log,
                             freemium model, and privacy without requiring login. Ongoing development will be funded through app sales, 
                             with marketing efforts including free workshops for PM teachers and experts. Join us in making project 
                             management learning and decision-making simpler and more enjoyable—download Decision Maker today and start 
                             making better decisions with confidence.






 
                        </Typography>
                        <div style={{ flex: 1 }}>
                          
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/dQw4w9WgXc"
                                title="Placeholder Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </Stack>
                </Box>
                </Stack>
          
        
          
        </Layout>
    )
}

export default AboutUs;