<<<<<<< HEAD
import React, { useState, useContext } from 'react'
import Header from '../components/Header'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography, Box, TextField, FormControl } from '@mui/material';
>>>>>>> 3f801cf1ba406ceba291bd297a5d53e42c4c92f8
import BackButton from '../components/BackButton';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Layout from '../components/Layout';
<<<<<<< HEAD
import CustomButton from '../components/Button';
import { NavLink } from 'react-router-dom';
import DecisionState from '../components/interfaces/DecisionState';
import { DecisionStateContext } from '../contexts/DecisionStateContext';

interface criterion {
    name: string,
    weight: number
}

const defaultCriterion = {
    name: "",
    weight: 0
}
=======
import { useBreadcrumbs } from '../contexts/BreadcrumbsProvider';

const NewCriteria = () => {
    const [formData, setFormData] = useState({ newCriteria: '' });
    const navigate = useNavigate(); // Get the navigate function from useNavigate

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
>>>>>>> 3f801cf1ba406ceba291bd297a5d53e42c4c92f8

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData); // Log the form data in the console
        navigate('/otherNewCriteria'); // Replace '/newPage' with the path you want to redirect to
    };

<<<<<<< HEAD

const NewCriteria = () => {
    const [criterion, setCriterion] = useState<string>("Cost");
    const {decisionState, setDecisionState} = useContext(DecisionStateContext);
    
    defaultCriterion.name = criterion;
    console.log(defaultCriterion) 
    decisionState.criteria.push(defaultCriterion)

    console.log(decisionState)
    
    const updateDecisionState = (updatedProperties: Partial<DecisionState>) => {
        console.log("Check if function is being accessed")
 

        console.log(updatedProperties)
        setDecisionState(prevState => ({
          ...prevState,
          ...updatedProperties,
        }));
      };
    
    
    const handleClick = () => {
        console.log("Button is Clicked");
      }

=======
    const { handleNavigation } = useBreadcrumbs();
    const addOtherCriteria = () => {
      handleNavigation('/OtherNewCriteria', 'Add Another Criteria');
    };
>>>>>>> 3f801cf1ba406ceba291bd297a5d53e42c4c92f8
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
                <form onSubmit={handleSubmit} style={{alignItems:'center', display:'flex', flexDirection:'column'}}>
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
                        onClick={addOtherCriteria}
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

<<<<<<< HEAD
export default NewCriteria
=======
export default NewCriteria;
>>>>>>> 3f801cf1ba406ceba291bd297a5d53e42c4c92f8
