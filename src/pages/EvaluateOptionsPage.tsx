import { Box, Container, FormControlLabel, Stack, Switch } from "@mui/material";
import Typography from "@mui/material/Typography";
// import { error } from 'console';
import Button from "@mui/material/Button";
import Layout from "../components/Layout";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import BackButton from "../components/BackButton";
import { NavLink } from "react-router-dom";
import CustomButton from "../components/Button";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import { useContext, useEffect } from "react";
import { Criterion } from "../components/interfaces/DecisionState";
import { DecisionStateContext } from "../contexts/DecisionStateContext";

interface Comparison {
  [option: string]: {
    [otherOption: string]: boolean;
  };
}

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

  // function addCriteria(name: string, criteria: string[], optionComparisons: number[][]){
  //     const len = criteria.length;
  //     criteria.push(name);
  //     for (let i = 0; i < len; i++) {
  //         optionComparisons[i][len] = 1
  //     }
  //     let newRow = [];
  //     for (let i = 0; i < len+1; i++) {
  //         newRow.push(1);
  //     }
  //     optionComparisons.push(newRow)

  //     console.log("Criteria added successfully")
  // }
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);

  //   function deleteCriteria(
  //     name: string,
  //     criteria: string[],
  //     optionComparisons: number[][]
  //   ) {
  //     try {
  //       const index = criteria.indexOf(name);
  //       if (index !== -1) {
  //         criteria.splice(index, 1);

  //         //code to delete column where the specific criteria appears
  //         for (let i = 0; i < optionComparisons.length; i++) {
  //           optionComparisons[i].splice(index, 1);
  //         }
  //         //To delete row comtaining comparisons of the deleted criteria
  //         optionComparisons.splice(index, 1);
  //       } else {
  //         throw Error;
  //       }
  //     } catch (error) {
  //       console.log(
  //         "Failed to delete specified criteria. Specified criteria does not exist"
  //       );
  //     }
  //   }

  function handleClick() {
    console.log("You clicked me");
  }

  useEffect(() => {
    const initializeComparisons = (
      criteria: Criterion[],
      options: string[]
    ) => {
      return criteria.map((criterion) => {
        const comparisons: Comparison = {};
        options.forEach((option, i) => {
          comparisons[option] = {};
          options.slice(i + 1).forEach((nextOption) => {
            comparisons[option][nextOption] = false; // Default comparison value
          });
        });
        return { ...criterion, comparisons };
      });
    };

    const updatedCriteria = initializeComparisons(
      decisionState.criteria,
      decisionState.options
    );
    setDecisionState({ ...decisionState, criteria: updatedCriteria });
  }, []);

  const handleComparisonChange = (
    criterionIndex: number,
    option1: string,
    option2: string,
    value: boolean
  ) => {
    const updatedCriteria = decisionState.criteria.map((criterion, i) => {
      if (i === criterionIndex) {
        return {
          ...criterion,
          comparisons: {
            ...criterion.comparisons,
            [option1]: {
              ...criterion.comparisons[option1],
              [option2]: value,
            },
          },
        };
      }
      return criterion;
    });
  };

  console.log(decisionState);
  const { handleNavigation } = useBreadcrumbs();
  const Results = () => {
    handleNavigation("/ResultsPage", "Results");
  };
  return (
    <Layout>
      <Stack>
        <div style={{ marginLeft: "30px" }}>
          {" "}
          <BackButton />
        </div>
      </Stack>
      <Container
        sx={{
          display: "100vh",
          paddingTop: "2",
        }}
      >
        <Box
          sx={{
            display: "grid",
            height: "80vh",
            width: "100%",
            gap: 1,
            padding: 2,
            boxShadow: 3, // Added shadow effect
            backgroundColor: "white",
            gridTemplate: `"result result result result option"
                        "result result result result ranking"
                        "result result result result ranking"
                        ". . save save ranking"
                        `,
          }}
        >
          <Box
            sx={{
              gridArea: "result",
            }}
          >
            <Container>
              {decisionState.criteria.map((criterion, criterionIndex) => (
                <Box key={criterionIndex} mb={4}>
                  <Typography variant="h6">
                    {criterion.name} Comparisons
                  </Typography>
                  {Object.keys(criterion.comparisons).map((option1) =>
                    Object.keys(criterion.comparisons[option1]).map(
                      (option2) => (
                        <Box key={`${option1}-${option2}`} mb={2}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={
                                  criterion.comparisons[option1][option2]
                                }
                                onChange={(e) =>
                                  handleComparisonChange(
                                    criterionIndex,
                                    option1,
                                    option2,
                                    e.target.checked
                                  )
                                }
                              />
                            }
                            label={`${option1} is preferred over ${option2}`}
                          />
                        </Box>
                      )
                    )
                  )}
                </Box>
              ))}
            </Container>
          </Box>
          <Box
            sx={{
              gridArea: "option",

              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: 3, // Added shadow effect
              backgroundColor: "white",
            }}
          >
            <Button variant="contained">Add Criteria</Button>
          </Box>
          <Box
            sx={{
              gridArea: "ranking",

              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 2.5,
              boxShadow: 3, // Added shadow effect
              backgroundColor: "white",
            }}
          >
            <Typography
              variant="body1"
              alignSelf="flex-start"
              sx={{
                fontWeight: "800",
              }}
            >
              Criteria
            </Typography>
            {decisionState.options.map((option) => (
              <Stack gap={3} direction="column" justifyContent="center">
                <Stack
                  gap={2}
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <AdsClickIcon style={{ fontSize: "56px", padding: "2" }} />
                  <Stack>
                    <Typography variant="body1">{option}</Typography>
                    <Button variant="contained">Edit Criteria</Button>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Box>
          <Box
            sx={{
              gridArea: "save",
            }}
          >
            <NavLink
              to="/ResultsPage"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CustomButton onClick={Results}>PROCEED</CustomButton>
            </NavLink>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default EvaluateOptions;
