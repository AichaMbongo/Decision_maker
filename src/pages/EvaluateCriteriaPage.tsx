import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Slider,
  Typography,
  Button,
  Alert,
  Stack,
} from "@mui/material";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import { NavLink } from "react-router-dom";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import CustomButton from "../components/Button";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import { DecisionStateContext } from "../contexts/DecisionStateContext";

const CriteriaPage = () => {
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);
  const [weightsValid, setWeightsValid] = useState(true);

  // Update criterion weight in decisionState
  const handleWeightChange = (index: number, value: number) => {
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
      handleNavigation("/OtherNewCriteria", "Other New Criteria");
      // Proceed with further actions like submitting the data
    } else {
      console.log("Weights do not sum to 1. Please correct them.");
    }
  };

  const { handleNavigation } = useBreadcrumbs();
  const EnterOption = () => {
    handleNavigation("/NewOption", "New Option");
  };

  return (
    <Layout>
      <Stack style={{ margin: '2vh' }}>
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
            height: "70vh",
            width: "100%",
            gap: 1,
            padding: 2,
            boxShadow: 3,
            backgroundColor: "white",
            gridTemplateColumns: { xs: "1fr", md: "3fr 1fr" },
            gridTemplateRows: { xs: "auto", md: "auto 1fr auto" },
            gridTemplateAreas: {
              xs: `"result" "option" "ranking" "save"`,
              md: `"result option" "result ranking" "result save"`,
            },
          }}
        >
          <Box sx={{ gridArea: "result" }}>
            <Container>
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
                    onChange={(e, value) =>
                      handleWeightChange(index, value as number)
                    }
                    valueLabelDisplay="auto"
                  />
                </Box>
              ))}
              {!weightsValid && (
                <Alert severity="error">
                  The weights must sum to 1. Please adjust the values
                </Alert>
              )}
            </Container>
          </Box>
          <Box
            sx={{
              gridArea: "option",
              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: 3,
              backgroundColor: "white",
            }}
          >
            <Button onClick={handleClick} variant="contained">
              Update Criteria Weights
            </Button>
          </Box>
          <Box
            sx={{
              gridArea: "ranking",
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 2.5,
              boxShadow: 3,
              backgroundColor: "white",
            }}
          >
            <Typography
              variant="body1"
              alignSelf="flex-start"
              sx={{ fontWeight: "800" }}
            >
              Criteria
            </Typography>
            {options.map((option) => (
              <Stack
                key={option}
                gap={3}
                direction="column"
                justifyContent="center"
              >
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
              mt: { xs: 2, md: 0 },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <NavLink
              to="/NewOption"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CustomButton onClick={EnterOption}>PROCEED</CustomButton>
            </NavLink>
          </Box>
        </Box>

      </Container>
    </Layout>
  );
};

export default CriteriaPage;
