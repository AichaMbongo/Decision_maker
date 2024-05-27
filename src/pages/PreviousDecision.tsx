import React from 'react';
import { Box, Typography, Grid, Stack, Paper, styled } from '@mui/material';
import Layout from '../components/Layout';
import SearchBox from '../components/Search';
import AddIcon from '@mui/icons-material/Add';
import BackButton from '../components/BackButton';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import { NavLink } from 'react-router-dom';
import CustomButton from '../components/Button';
import { useBreadcrumbs } from '../contexts/BreadcrumbsProvider';


const PreviousDecisions: React.FC = () => {
    const { handleNavigation } = useBreadcrumbs();
    const goToNewDecision = () => {
      handleNavigation('/NewDecision', 'New Decision');
    };

    const handleClick = () => {
        console.log("Button is Clicked");
      }

      const handleSearchSubmit = (query: string) => {
        console.log('Search query:', query);
        // Implement your search functionality here
      };


      const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    interface Decision {
        id: number;
        name: string;
        description: string; // New property for description
      }

      const decisionData: Decision[] = [
        { id: 1, name: 'Buy House', description: 'Purchase a residential property to live in or as an investment.' },
        { id: 2, name: 'Investment Stock', description: 'Invest in stocks or securities to generate financial returns.' },
        { id: 3, name: 'Buy Car', description: 'Acquire a vehicle for personal or professional use.' },
        { id: 4, name: 'Tourist Destination', description: 'Visit a location for leisure, exploration, or vacation.' },
      ];

      interface SearchBoxProps {
        onSubmit: (query: string) => void;
      }

      return (

        <Layout>

            <Stack>
                <div style={{ marginLeft: '30px' }}> <BackButton /></div>
            </Stack>
          <Stack direction="column" spacing={2} alignItems="center" justifyContent="center" >
            <Stack className="stack-container">
          <Typography variant='h3'> 
                    List of Previous Decisions
                  </Typography>
                <Box

                >
<SearchBox onSubmit={handleSearchSubmit} />                    

                </Box>
                
                <Box mt={3}>
                <NavLink to="/newDecision" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CustomButton onClick={goToNewDecision}endIcon={<AddIcon />} >
                      Add New Decision
                    </CustomButton>
                  </NavLink>
              
               

                </Box>
                </Stack>
                <Grid container padding={4} rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {decisionData.map((decision) => (
                <Grid item xs={3}  key={decision.id}>
                <Item sx= {{ margin: 3 }}>
                    <Stack gap={2} direction="row" alignItems="center" justifyContent="center">
                    <PsychologyOutlinedIcon style={{ fontSize: '56px', padding: '2' }} />
                    <Stack>
                        <Typography variant='subtitle1'>{decision.name}</Typography>
                        <Typography variant='body1'>{decision.description}</Typography>
                        <CustomButton onClick={handleClick}>Edit decision</CustomButton>
                    </Stack>
                    </Stack>
                </Item>
                </Grid>
            ))}
            </Grid>

            </Stack>
        </Layout>
      );

      }

export default PreviousDecisions
