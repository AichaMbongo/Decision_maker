import {
  Box,
  Container,
  Stack,
  Slider,
  Typography,
  Alert,
  Button,
} from "@mui/material";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import { NavLink } from "react-router-dom";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import { useContext, useEffect, useState } from "react";
import { DecisionStateContext } from "../contexts/DecisionStateContext";

const CriteriaPage = () => {
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);
  const [weightsValid, setWeightsValid] = useState(true);
  const { handleNavigation } = useBreadcrumbs();

  const options: string[] = ["Cost", "Safety", "Maintenance"]; // Explicitly typing options array

  const handleWeightChange = (index: number, value: number) => {
    // Explicitly typing index and value parameters
    const otherTotalWeight = decisionState.criteria.reduce(
      (total, criterion, i) => {
        return i === index ? total : total + criterion.weight;
      },
      0
    );

    const remainingWeight = 1 - value;
    const factor =
      otherTotalWeight === 0 ? 0 : remainingWeight / otherTotalWeight;

    const updatedCriteria = decisionState.criteria.map((criterion, i) => {
      if (i === index) {
        return { ...criterion, weight: value };
      } else {
        return { ...criterion, weight: criterion.weight * factor };
      }
    });

    setDecisionState({ ...decisionState, criteria: updatedCriteria });
  };

  useEffect(() => {
    const totalWeight = decisionState.criteria.reduce(
      (total, criterion) => total + criterion.weight,
      0
    );
    setWeightsValid(totalWeight === 1);
  }, [decisionState.criteria]);

  const handleClick = () => {
    if (weightsValid) {
      console.log("Weights are valid and sum to 1:", decisionState.criteria);
      handleNavigation("/NewOption", "New Option");
    } else {
      console.log("Weights do not sum to 1. Please correct them.");
    }
  };

  const EnterOption = () => {
    handleNavigation("/NewOption", "New Option");
  };

  return (
    <Layout>
      <Stack sx={{ marginLeft: { xs: 0, md: "30px" }, marginBottom: 2 }}>
        <BackButton />
      </Stack>
      <Container sx={{ paddingY: 2 }}>
        <Box
          sx={{
            padding: 8,
            boxShadow: 3,
            backgroundColor: "white",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Update Weights
          </Typography>
          {decisionState.criteria.map((criterion, index) => (
            <Box key={index} mb={2}>
              <Typography variant="h6">{`${criterion.name} Weight`}</Typography>
              <Slider
                value={criterion.weight}
                min={0}
                max={1}
                step={0.01}
                onChange={
                  (e, value) => handleWeightChange(index, value as number) // Ensure value is typed as number
                }
                valueLabelDisplay="auto"
              />
            </Box>
          ))}
          {!weightsValid && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              The weights must sum to 1. Please adjust the values.
            </Alert>
          )}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <NavLink
              to="/NewOption"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                variant="contained"
                onClick={EnterOption}
                sx={{ width: "100%" }}
              >
                PROCEED
              </Button>
            </NavLink>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default CriteriaPage;
