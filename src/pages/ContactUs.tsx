// ContactUs.tsx
import React from 'react';
import Header from '../components/Header';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import BackButton from '../components/BackButton';
import { Stack, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Footer from '../components/Footer';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import InputField from '../components/input-field';
import CustomButton from '../components/Button';
import TextArea from '../components/TextArea'; 
import DropArea from '../components/DropArea'; 
import Layout from '../components/Layout';


function ContactUs() {
    function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    
    const fields = [
        { id: 'subject', label: 'Subject', variant: 'outlined' as const, defaultValue: '' },
        { id: 'email', label: 'Email', variant: 'outlined' as const, defaultValue: '' },
    ];

    
    const handleFileDrop = (files: FileList) => {
        
    };

    return (
        <Layout>
             <Stack>
                <div style={{ marginLeft: '30px' }}> <BackButton /></div>
            </Stack>
            
            <Stack direction="column" spacing={2} alignItems="center" textAlign="center" justifyContent="center" style={{ marginBottom: '154px' , padding:3, marginTop:'10px' }}>

            <Box className="stack-container">
            <Stack sx={{ p: 2 }} gap={9} direction="column">
                
               
                <div><Typography variant='h3' align="center">Contact Us</Typography></div>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <InputField fields={fields} />
                </Box>
           

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5px',marginBottom: '10px', padding: 4 }}>
                <Box sx={{ marginRight: '30px', height: '200px', width: '690px',  }}>
                    <TextArea />
                </Box>
                <Box sx={{ height: '200px', width: '500px' }}>
                    <DropArea onDrop={handleFileDrop} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'right', marginRight: '100px',marginBottom: '30px' }}>
            <Button variant="contained">Send</Button> 
            </Box>
            </Box>
            </Stack>
        </Layout>
    )
}

export default ContactUs;
