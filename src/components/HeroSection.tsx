import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import CustomButton from './Button';
import BasicTextField from './input-field';
import GolfCourseTwoToneIcon from '@mui/icons-material/GolfCourseTwoTone';
import LinearProgress from '@mui/material/LinearProgress';

interface Field {
    id: string;
    label: string;
    variant: 'outlined' | 'filled' | 'standard';
    defaultValue?: string;
}

const HeroSection: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const fields: Field[] = [
        { id: 'decision_name', label: 'E.g. "To buy a car"', variant: 'filled', defaultValue: '' },
    ];

    return (
        <>
            {loading && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh', // Set height to 100vh for full viewport height
                    }}
                >
                    <Box>
                        <Typography variant="h2" gutterBottom>Decision Maker</Typography>
                        <LinearProgress />
                    </Box>
                </Box>
            )}
            {!loading && (
                <Box className='hero-section hero-image'
                sx={{
                   
                    opacity: 0,
                    animation: 'fadeIn 1s ease forwards', // Apply fade-in animation
                }}>
                    <Box sx={{ marginRight: '30rem' }}>
                        <Typography variant="h1" gutterBottom>Welcome to Decision Maker</Typography>
                        <Typography variant="h2" gutterBottom>What is Your Goal?</Typography>
                        <GolfCourseTwoToneIcon sx={{ width: '60px', height: '60px', marginLeft: '8px' }} />
                        <Box sx={{ width: '100%', maxWidth: '500px' }}>
                            <BasicTextField fields={fields} />
                        </Box>
                        <CustomButton
                            onClick={() => {}}
                            disabled={false}
                            width="50%"
                        >
                            {'Proceed'}
                        </CustomButton>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default HeroSection;
