import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const NotFound: React.FC = () => {
    return (
        <Layout>
            <Stack
                direction="column"
                spacing={2}
                alignItems="center"
                textAlign="center"
                justifyContent="center"
                sx={{ height: '100vh', padding: 2 }}
            >
                <Box>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                        404
                    </Typography>
                    <Typography variant="h4" color="textSecondary" paragraph>
                        Page Not Found
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        Sorry, the page you are looking for does not exist. It might have been moved or deleted.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/"
                        sx={{ mt: 3 }}
                    >
                        Go to Home
                    </Button>
                </Box>
            </Stack>
        </Layout>
    );
};

export default NotFound;
