import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography, Box, TextField, FormControl } from '@mui/material';
import BackButton from '../components/BackButton';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Layout from '../components/Layout';
import { useBreadcrumbs } from '../contexts/BreadcrumbsProvider';

const NewCriteria = () => {
    const [formData, setFormData] = useState({ newCriteria: '' });
    const navigate = useNavigate(); // Get the navigate function from useNavigate

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData); // Log the form data in the console

        // Call addOtherCriteria to update the breadcrumb navigation
        addOtherCriteria();

        // Navigate to the new criteria page
        navigate('/OtherNewCriteria'); // Replace '/newPage' with the path you want to redirect to
    };

    const { handleNavigation } = useBreadcrumbs();
    const addOtherCriteria = () => {
        handleNavigation('/OtherNewCriteria', 'Add Another Criteria');
    };

    return (
        <Layout>

            <div style={{ marginLeft: '30px' }}>
                <BackButton />
            </div>

            <Stack direction="column" spacing={2} alignItems="center" justifyContent="center" >
                <Stack className="stack-container">
                    <Typography variant='h3' align="center">Type in a New Criteria</Typography>


                    <Stack direction="column" spacing={2} alignItems="center" justifyContent="center" style={{ marginBottom: '78px', padding: 3, marginTop: '10px' }}>
                        <FormatListBulletedIcon style={{ fontSize: '56px', padding: '2' }} />
                        <form onSubmit={handleSubmit} style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                            <Box
                                component="div"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '50ch' },
                                }}
                            >
                                <FormControl variant="standard">
                                    <TextField id="filled-basic"
                                        name="newCriteria"
                                        label="ie. Cost, Comfort"
                                        variant="filled"
                                        value={formData.newCriteria}
                                        onChange={handleChange} />
                                </FormControl>
                            </Box>
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: '16px',
                                    paddingRight: 2,
                                    paddingLeft: 2,
                                    marginBottom: 2,
                                    minWidth: '200px', // Adjust the width as desired
                                }}
                                type="submit"
                            >
                                Enter New Criteria
                            </Button>


                        </form>
                    </Stack>
                </Stack>
            </Stack>
        </Layout>
    );
}

export default NewCriteria;
