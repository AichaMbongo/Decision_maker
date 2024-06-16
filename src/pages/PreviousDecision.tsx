import React, { useState } from 'react';
import { Box, Typography, Grid, Stack, Paper, styled } from '@mui/material';
import Layout from '../components/Layout';
import AddIcon from '@mui/icons-material/Add';
import BackButton from '../components/BackButton';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Search } from '@mui/icons-material';

// Define the Decision interface
interface Decision {
  id: number;
  name: string;
  description: string;
}

const PreviousDecisions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredDecisions, setFilteredDecisions] = useState<Decision[]>([]);

  const decisionData: Decision[] = [
    { id: 1, name: 'Buy House', description: 'Purchase a residential property to live in or as an investment.' },
    { id: 2, name: 'Investment Stock', description: 'Invest in stocks or securities to generate financial returns.' },
    { id: 3, name: 'Buy Car', description: 'Acquire a vehicle for personal or professional use.' },
    { id: 4, name: 'Tourist Destination', description: 'Visit a location for leisure, exploration, or vacation.' },
    { id: 5, name: 'Start a Business', description: 'Establish and run a company to provide goods or services.' },
    { id: 6, name: 'Higher Education', description: 'Pursue further academic studies to gain specialized knowledge.' },
    { id: 7, name: 'Fitness Goals', description: 'Achieve personal fitness milestones through exercise and diet.' },
    { id: 8, name: 'Learn a New Skill', description: 'Acquire proficiency in a new skill or hobby.' },
    { id: 9, name: 'Volunteer Work', description: 'Contribute time and effort to support a charitable cause or organization.' },
    { id: 10, name: 'Travel Abroad', description: 'Explore foreign countries and experience different cultures.' },
  ];
  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchSubmit = () => {
    const normalizedQuery = searchQuery.toLowerCase().trim();
    if (normalizedQuery === '') {
      setFilteredDecisions([]);
    } else {
      const filtered = decisionData.filter(decision =>
        decision.name.toLowerCase().includes(normalizedQuery)
      );
      if (filtered.length === 0) {
        // If no decisions match the query, set filteredDecisions to a special "no results" decision
        setFilteredDecisions([{ id: 0, name: 'No decision found', description: 'No decision matches your search.' }]);
      } else {
        setFilteredDecisions(filtered);
      }
    }
  };

  const clearSearchResults = () => {
    setSearchQuery('');
    setFilteredDecisions([]);
  };

  const goToNewDecision = () => {
    // Implementation for navigation
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Layout>
      <Stack style={{margin:'2vh'}}>
        <div style={{ marginLeft: '30px' }}><BackButton /></div>
      </Stack>
      <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
        <Stack className="stack-container">
          <Typography variant='h3'>
            List of Previous Decisions
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '2vh' }}>
            <TextField
              value={searchQuery}
              onChange={handleSearchChange}
              label="Search previous decisions"
              variant="standard"
              size="small"
              sx={{ mr: 2, width: '35vh' }}
            />
            <Button variant="contained" onClick={handleSearchSubmit}>
              <Search />
            </Button>
            <Button variant="outlined" onClick={clearSearchResults} sx={{ ml: 2 }}>
              Clear
            </Button>
          </Box>
          <Box mt={8}>
            <NavLink to="/newDecision" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button variant="contained" color='primary' onClick={goToNewDecision} endIcon={<AddIcon />} >
                Add New Decision
              </Button>
            </NavLink>
          </Box>
        </Stack>

        <Grid container spacing={2}>
          {(filteredDecisions.length > 0 ? filteredDecisions : decisionData).map((decision) => (
            <Grid item xs={3} key={decision.id}>
              <Item sx={{ margin: 3 }}>
                <Stack gap={2} direction="row" alignItems="center" justifyContent="center">
                  <PsychologyOutlinedIcon style={{ fontSize: '56px', padding: '2' }} />
                  <Stack>
                    <Typography variant='subtitle1'>{decision.name}</Typography>
                    <Typography variant='body1'>{decision.description}</Typography>
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

export default PreviousDecisions;
