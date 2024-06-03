
import { Box, Container,Stack } from '@mui/material';
import { useContext } from 'react';
import Typography from '@mui/material/Typography';
// import { error } from 'console';
import Button from '@mui/material/Button';
import Layout from '../components/Layout';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import BackButton from '../components/BackButton';
import { DecisionStateContext } from '../contexts/DecisionStateContext';
import { useBreadcrumbs } from '../contexts/BreadcrumbsProvider';
import { NavLink } from 'react-router-dom';
import CustomButton from '../components/Button';

const options = ["Mercedes", "Audi", "BMW"]
const optionComparisons = []

const ResultsPage = () => {

    const { decisionState, setDecisionState } = useContext(DecisionStateContext);
    console.log(decisionState)
    console.log("It didn't work")

    const generatePairwiseComparisons = () =>{
        const options = decisionState.options
        console.log("Generating pairwise comparisions")

        for (let i = 0; i < options.length -1; i++){            
            for (let j = i+1; j < options.length; j++) {
                console.log(options[i], options[j]);
            }            
        }

    }

    generatePairwiseComparisons()
    const { handleNavigation } = useBreadcrumbs();
    const ViewPreviousDecisions = () => {
    handleNavigation('/PreviousDecison', 'Previous Decision');
    };
    return (
        
        <Layout>
            
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

                        display: "grid",
                        height: '80vh',
                        width: '100%',

                        gap: 1,
                        padding: 2,
                        boxShadow: 3 ,
                        backgroundColor: 'white',


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
                            
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: 3, // Added shadow effect
                            backgroundColor: 'white',
                        }}
                    >
                        <Button variant="contained">Add Criteria</Button>  
                    </Box>
                    <Box
                        sx={{
                            gridArea: "ranking",
                           
                            borderRadius: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            padding: 2.5,
                            boxShadow: 3, // Added shadow effect
                            backgroundColor: 'white',
                        }}
                    >

                        <Typography variant="body1" alignSelf="flex-start" >Criteria</Typography>
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

                        <NavLink to="/PreviousDecision" style={{ textDecoration: 'none', color: 'inherit' }}>

                        <CustomButton onClick={ViewPreviousDecisions}>
                        Save Decision
                        </CustomButton>
                        </NavLink>
                        
                    </Box>


                </Box>
            </Container>
        </Layout>
    )
}

export default ResultsPage