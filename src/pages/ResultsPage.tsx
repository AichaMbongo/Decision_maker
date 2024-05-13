import { Box, Container,Stack } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';
// import { error } from 'console';
import Button from '@mui/material/Button';
import Layout from '../components/Layout';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import BackButton from '../components/BackButton';

const options =  ["Mercedes", "Audi", "BMW"]
const optionComparisons = []

const ResultsPage = () => {
    
    return (
        <Layout>
        <Stack sx={{ p: 2 , mt: 2 }} gap={9} direction="column">
                
        {/* <div role="presentation" onClick={handleClick} style={{ marginLeft: '90px' }}> */}
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                >
                    Decision
                </Link>

                <Link
                    underline="hover"
                    color="inherit"
                    href="/decisionModel"
                >
                    Decision Model
                </Link>
            </Breadcrumbs>
        {/* </div> */}
    </Stack>
    <Stack>
        <div style={{ marginLeft: '30px' }}> <BackButton /></div>
    </Stack>
    <Container
            sx={{
                display: '100vh',
                paddingTop: '2',
            }}

        >
        <Box
            sx={{
                
                display:"grid",
                height: '80vh',
                width: '100%',
                
                gap: 1,
                padding:2,
                
                
                gridTemplate: 
                `"result result result result option"
                "result result result result ranking"
                "result result result result ranking"
                ". . save save ranking"
                `,
            }}
        >
            <Box
                sx={{
                    gridArea: "result"
                }}
            >
                {/* <Typography variant ="h5"></Typography>
                <Typography></Typography> */}

            
            </Box>
            <Box
                            sx={{
                                gridArea: "option",
                                border: 1,
                                borderRadius: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                       
                            }}
            >

            <Button variant="contained">Add New Option</Button>  
            
            </Box>
            <Box
                        sx={{
                            gridArea: "ranking",
                            border: 1,
                            borderRadius: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            
                            gap: 2,
                            padding: 2.5

                            
                        }}>
                        
                        <Typography variant ="body1" alignSelf="flex-start" >Criteria</Typography>
                        {options.map((option) => (
                            <Stack gap={3} direction="column" justifyContent="center">
                            <Stack gap={2} direction="row" alignItems="center" justifyContent="flex-start">
                                <AdsClickIcon style={{ fontSize: '56px', padding: '2' }} />
                                <Stack>
                                    <Typography variant='body1'>{option}</Typography>
                                    <Button variant="contained">Edit Criteria</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                        ))}
            </Box>
            <Box
                        sx={{
                            gridArea: "save"
                        }}>
                <Button variant="contained">Proceed</Button>     
                        </Box>


        </Box>
        </Container>
    </Layout>
  )
}

export default ResultsPage