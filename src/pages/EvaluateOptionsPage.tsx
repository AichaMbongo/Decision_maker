import React, { useState } from 'react';
import { Box, Container, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
// import { error } from 'console';
import Button from '@mui/material/Button';
import Layout from '../components/Layout';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import BackButton from '../components/BackButton';
import { NavLink } from 'react-router-dom';
import CustomButton from '../components/Button';
import { useBreadcrumbs } from '../contexts/BreadcrumbsProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const EvaluateOptions = () => {
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

    function addCriteria(name: string, criteria: string[], optionComparisons: number[][]) {
        const len = criteria.length;
        criteria.push(name);
        for (let i = 0; i < len; i++) {
            optionComparisons[i][len] = 1
        }
        let newRow = [];
        for (let i = 0; i < len + 1; i++) {
            newRow.push(1);
        }
        optionComparisons.push(newRow)

        console.log("Criteria added successfully")
    }

    function deleteCriteria(name: string, criteria: string[], optionComparisons: number[][]) {
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

            } else {
                throw Error;

            }
        } catch (error) {
            console.log("Failed to delete specified criteria. Specified criteria does not exist")
        }


    }

    function handleClick() {
        console.log("You clicked me")
    }

    const OptionPaper = styled(Paper)(({ theme }) => ({
        width: 350,
        height: 300,
        padding: theme.spacing(1),
        ...theme.typography.body2,
        display: 'flex',
        flexDirection: 'column',
        gap: 4
    }));

    const { handleNavigation } = useBreadcrumbs();
    const Results = () => {
        handleNavigation('/ResultsPage', 'Results');
    };

    const criteria: string[] = ["Cost", "Comfort", "Fuel Saving"];
    const options: string[] = ["BMW", "Mercedez", "Audi"];

    const generateCombinations = (options: string[], length: number): string[][] => {
        const result: string[][] = [];
        const f = (prefix: string[] = [], start: number = 0) => {
            if (prefix.length === length) {
                result.push(prefix);
                return;
            }
            for (let i = start; i < options.length; i++) {
                f([...prefix, options[i]], i + 1);
            }
        };
        f();
        return result;
    };

    const combinations = generateCombinations(options, 2);

    // the logic of displaying criteria and pairwise options comparison
    const [criterionIndex, setCriterionIndex] = useState(0);
    const [combinationIndex, setCombinationIndex] = useState(0);
    const [selections, setSelections] = useState<string[]>([]);

    const handleSelect = (option: string) => {
        setSelections([...selections, option]);

        if (combinationIndex < combinations.length - 1) {
            setCombinationIndex(combinationIndex + 1);
        } else if (criterionIndex < criteria.length - 1) {
            setCriterionIndex(criterionIndex + 1);
            setCombinationIndex(0);
        } else {
            // All criteria and combinations are done, you can handle the end of selection process here
            console.log('Selections completed:', selections);
        }
    };

    const handleNext = () => {
        if (combinationIndex < combinations.length - 1) {
            setCombinationIndex(combinationIndex + 1);
        } else if (criterionIndex < criteria.length - 1) {
            setCriterionIndex(criterionIndex + 1);
            setCombinationIndex(0);
        }
    };

    const handlePrevious = () => {
        if (combinationIndex > 0) {
            setCombinationIndex(combinationIndex - 1);
        } else if (criterionIndex > 0) {
            setCriterionIndex(criterionIndex - 1);
            setCombinationIndex(combinations.length - 1);
        }
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
                        boxShadow: 3, // Added shadow effect
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
                        {/* Result Area */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                            <OptionPaper>
                                <Box sx={{bgcolor:'lightgrey', p: 2, display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <IconButton aria-label="arrowbackios" onClick={handlePrevious}>
                                        <ArrowBackIosIcon />
                                    </IconButton>
                                    <Typography sx={{ fontWeight: 'bold' }}>  {criteria[criterionIndex]}</Typography>
                                    <IconButton aria-label="arrowforwardios" onClick={handleNext}>
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ p: 4, display: 'flex', flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    {combinations[combinationIndex].map((option, index) => (
                                        <Button
                                            key={index}
                                            variant="contained"
                                            onClick={() => handleSelect(option)}
                                        >
                                            {option}
                                        </Button>
                                    ))}
                                </Box>
                                <Box sx={{ p: 1, textAlign: 'center' }}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        Please Set Your Preference on Options Based On This Criteria
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 'xs' }}>
                                        Click one of the Buttons Above
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 2 }}>
                                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                                        Evaluation based on 'Criteria'
                                    </Typography>
                                </Box>
                            </OptionPaper>
                        </Box>
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
                        <Button component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<AddIcon />}
                        >
                            Add Option

                        </Button>
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

                        <Typography variant="body1" alignSelf="flex-start" sx={{
                            fontWeight: '800'
                        }} >Options</Typography>
                        {options.map((option) => (
                            <Stack gap={3} direction="column" justifyContent="center">
                                <Stack gap={2} direction="row" alignItems="center" justifyContent="flex-start">
                                    <AdsClickIcon style={{ fontSize: '56px', padding: '2' }} />
                                    <Stack>
                                        <Typography variant='body1'>{option}</Typography>
                                        <Button component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<DeleteIcon />}
                                        >
                                            Delete

                                        </Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            gridArea: "save"
                        }}>

                        <NavLink to="/ResultsPage" style={{ textDecoration: 'none', color: 'inherit' }}>

                            <CustomButton onClick={Results}>
                                PROCEED
                            </CustomButton>
                        </NavLink>
                    </Box>


                </Box>
            </Container>
        </Layout>
    )
}

export default EvaluateOptions