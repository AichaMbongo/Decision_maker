import React, { useContext, useEffect, useState } from "react";
import { Container, Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// import BarChartComponent from "./BarChartComponent";
import BarChartComponent from "./interfaces/BarChartComponent";
import { DecisionStateContext } from "../contexts/DecisionStateContext";
import { Criterion } from "./interfaces/DecisionState";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
interface Comparison {
  [option: string]: {
    [otherOption: string]: number;
  };
}
interface AggregatedPreference {
  [option: string]: number;
}

const PairwiseComparison: React.FC = () => {
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);
  const [criterionIndex, setCriterionIndex] = useState(0);
  const [combinationIndex, setCombinationIndex] = useState(0);
  const { handleNavigation } = useBreadcrumbs();

  // useEffect(() => {
  //   const initializeComparisons = (
  //     criteria: Criterion[],
  //     options: string[]
  //   ) => {
  //     return criteria.map((criterion) => {
  //       const comparisons: Comparison = {};
  //       options.forEach((option, i) => {
  //         comparisons[option] = {};
  //         options.slice(i + 1).forEach((nextOption) => {
  //           comparisons[option][nextOption] = 0; // Default comparison value
  //         });
  //       });
  //       return { ...criterion, comparisons };
  //     });
  //   };

  //   const updatedCriteria = initializeComparisons(
  //     decisionState.criteria,
  //     decisionState.options
  //   );
  //   setDecisionState({ ...decisionState, criteria: updatedCriteria });
  // }, []);

  useEffect(() => {
    const generateResults = () => {
      const results: { [criterion: string]: Comparison } = {};
      const aggregatedPreferences: {
        [criterion: string]: AggregatedPreference;
      } = {};

      decisionState.criteria.forEach((criterion) => {
        // const criterionResults: Comparison = {};
        const criterionAggregated: AggregatedPreference = {};

        // Initialize the criterionAggregated with all options set to 0
        decisionState.options.forEach((option) => {
          criterionAggregated[option] = 0;
        });

        Object.keys(criterion.comparisons).forEach((option1) => {
          // criterionResults[option1] = {};

          Object.keys(criterion.comparisons[option1]).forEach((option2) => {
            const value = criterion.comparisons[option1][option2];

            criterionAggregated[option1] += value;
            criterionAggregated[option2] += 1 - value;
          });
        });

        // results[criterion.name] = criterionResults;
        aggregatedPreferences[criterion.name] = criterionAggregated;
      });

      setDecisionState((prevData) => ({
        ...prevData,
        results,
        aggregatedPreferences,
      }));
    };

    generateResults();
  }, [decisionState.criteria, setDecisionState]);

  const criteria = decisionState.criteria.map((c) => c.name);
  console.log(criteria);
  const combinations = Object.keys(
    decisionState.criteria[criterionIndex].comparisons
  )
    .map((option1) =>
      Object.keys(
        decisionState.criteria[criterionIndex].comparisons[option1]
      ).map((option2) => [option1, option2])
    )
    .flat();

  const handlePrevious = () => {
    setCombinationIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : combinations.length - 1
    );
  };

  const handleNext = () => {
    setCombinationIndex((prevIndex) =>
      prevIndex < combinations.length - 1 ? prevIndex + 1 : 0
    );
    // if (combinationIndex == combinations.length - 1) {
    //   if (criterionIndex == criteria.length - 1) {
    //     handleNavigation("/ResultsPage", "Results Page");
    //   }
    //   handleNextCriterion();
    // } else {
    //   handleNext();
    // }
  };

  const handlePreviousCriterion = () => {
    setCriterionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : criteria.length - 1
    );
    setCombinationIndex(0); // Reset combination index when changing criterion
  };

  const handleNextCriterion = () => {
    setCriterionIndex((prevIndex) =>
      prevIndex < criteria.length - 1 ? prevIndex + 1 : 0
    );
    setCombinationIndex(0); // Reset combination index when changing criterion
  };

  const handleSelect = (selectedOption: string) => {
    const [option1, option2] = combinations[combinationIndex];
    const updatedCriteria = decisionState.criteria.map((criterion, i) => {
      if (i === criterionIndex) {
        return {
          ...criterion,
          comparisons: {
            ...criterion.comparisons,
            [option1]: {
              ...criterion.comparisons[option1],
              [option2]: selectedOption === option1 ? 1 : 0,
            },
          },
        };
      }
      return criterion;
    });

    setDecisionState({ ...decisionState, criteria: updatedCriteria });
    if (combinationIndex == combinations.length - 1) {
      handleNextCriterion();
    } else {
      handleNext();
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="arrowbackios"
            onClick={handlePreviousCriterion}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography sx={{ fontWeight: "bold" }}>
            {criteria[criterionIndex]}
          </Typography>
          <IconButton
            aria-label="arrowforwardios"
            onClick={handleNextCriterion}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Box
          sx={{
            bgcolor: "lightgrey",
            p: 2,
            display: "flex",
            flexDirection: "row",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton aria-label="arrowbackios" onClick={handlePrevious}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography
            sx={{ fontWeight: "bold" }}
          >{`${combinations[combinationIndex][0]} vs ${combinations[combinationIndex][1]}`}</Typography>
          <IconButton aria-label="arrowforwardios" onClick={handleNext}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "row",
            gap: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
        <Box sx={{ p: 1, textAlign: "center" }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Please Set Your Preference on Options Based On This Criteria
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: "xs" }}>
            Click one of the Buttons Above
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            Evaluation based on '{criteria[criterionIndex]}'
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => console.log(decisionState)}
      >
        Submit
      </Button>
    </Container>
  );
};

export default PairwiseComparison;
