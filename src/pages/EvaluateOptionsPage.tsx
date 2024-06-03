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

interface AggregatedPreference {
  [option: string]: number;
}

const EvaluateOptions = () => {
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);

  // useEffect(() => {
  //   const generateResults = () => {
  //     const results: { [criterion: string]: Comparison } = {};
  //     const aggregatedPreferences: { [criterion: string]: AggregatedPreference } = {};

  //     data.criteria.forEach(criterion => {
  //       const criterionResults: Comparison = {};
  //       const criterionAggregated: AggregatedPreference = {};

  //       // Initialize the criterionAggregated with all options set to 0
  //       data.options.forEach(option => {
  //         criterionAggregated[option] = 0;
  //       });

  //       Object.keys(criterion.comparisons).forEach(option1 => {
  //         criterionResults[option1] = {};

  //         Object.keys(criterion.comparisons[option1]).forEach(option2 => {
  //           const value = criterion.comparisons[option1][option2];
  //           criterionResults[option1][option2] = value;
  //           criterionResults[option2] = criterionResults[option2] || {};
  //           criterionResults[option2][option1] = 1 - value;

  //           criterionAggregated[option1] += value;
  //           criterionAggregated[option2] += 1 - value;
  //         });
  //       });

  //       results[criterion.name] = criterionResults;
  //       aggregatedPreferences[criterion.name] = criterionAggregated;
  //     });

  //     setDecisionState(prevData => ({ ...prevData, results, aggregatedPreferences }));
  //   };

  //   generateResults();
  // }, [decisionState.criteria, setDecisionState]);

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
        console.log(decisionState);
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
