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

function AboutUs() {

    function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Stack sx={{ p: 2 }} gap={9} direction="column">
                <div> <Header /></div>
                <div role="presentation" onClick={handleClick} style={{marginLeft:'90px'}}>
                    <Breadcrumbs aria-label="breadcrumb">
                    <div style={{marginLeft:'10px'}}> <BackButton /></div>
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/"
                        >
                            About Us
                        </Link>
                    </Breadcrumbs>
                </div>
            </Stack>
            
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '52px',
                    minHeight: 'calc(100vh - 260px)', // Adjust the height as needed
                }}
            >
                <Box sx={{ maxWidth: '800px', padding: '27px', border: '1px solid #ccc', borderRadius: '16px',backgroundColor: '#C3C3C3' }}>
                    <Typography variant="h6" gutterBottom>
                        We pay attention to your needs and help you make the best decisions
                    </Typography>
                    <Stack direction="row" spacing={4}>
                        <Typography variant="body1" sx={{ flex: 1, textAlign: 'left' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dapibus nisl sit amet lacinia tincidunt.
                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer
                            varius velit non felis dapibus, at aliquam erat vehicula. Ut non dolor eu lorem tristique volutpat vel
                            eget ex. Vestibulum ac enim ut leo egestas faucibus id at sem. Vivamus et quam enim. Ut feugiat eros nec
                            diam tincidunt, ut consequat justo lacinia. Integer consequat augue sit amet justo egestas, at consequat
                            libero blandit. 
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
            </Box>
            
            <Footer />
        </ThemeProvider>
    )
}

export default AboutUs;