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






const CriteriaPage = () => {
    //function to initialise pairwise comparison matrices
    // function initPairwiseMatrices(num:number) {
    //     let matrice: number[][] = [];
    //     for (let i = 0; i < num; i++) {
    //         for (let j = 0; j < num; j++) {
    //             matrice[i][j] = 1;   
    //         }        
    //     }
    //     return matrice;
    // }

    function addCriteria(name: string, criteria: string[], optionComparisons: number[][]){
        const len = criteria.length;
        criteria.push(name);
        for (let i = 0; i < len; i++) {
            optionComparisons[i][len] = 1
        }
        let newRow = [];
        for (let i = 0; i < len+1; i++) {
            newRow.push(1);
        }
        optionComparisons.push(newRow)

        console.log("Criteria added successfully")
    }

    function deleteCriteria(name: string, criteria: string[], optionComparisons: number[][]){
        try {
            const index = criteria.indexOf(name)
            if (index !== -1) {
                criteria.splice(index, 1);
        
                //code to delete column where the specific criteria appears
                for (let i = 0; i < optionComparisons.length; i++) {
                        optionComparisons[i].splice(index, 1);
                }
                //To delete row comtaining comparisons of the deleted criteria
                optionComparisons.splice(index, 1);
                
            }else{
                throw Error;

            }
        } catch (error) {
            console.log("Failed to delete specified criteria. Specified criteria does not exist")
        }
        
        
    }

    function handleClick(){
        console.log("You clicked me")
    }

    const options =  ["Cost", "Safety", "Maintenenance"];
    // const optionComparisons = initPairwiseMatrices(options.length);
    // const finalPriorities = ;

    return (
    <Layout>
        <Stack sx={{ p: 2 , mt: 10 }} gap={9} direction="column">
                
                <div role="presentation" onClick={handleClick} style={{ marginLeft: '90px' }}>
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
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/decisionModel"
                        >
                            Decision Model
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="#"
                        >
                            AHP Model
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/decisionModel"
                        >Evaluate Criteria</Link>
                    </Breadcrumbs>
                </div>
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

            <Button variant="contained">Add Criteria</Button>  
            
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
                        
                        <Typography variant ="body1" alignSelf="flex-start" sx={{
                            fontWeight: '800'
                        }} >Criteria</Typography>
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

export default CriteriaPage