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
    const updatedCriteria = decisionState.criteria.map((criterion, i) =>
      i === index ? { ...criterion, weight: value } : criterion
    );
    setDecisionState({ ...decisionState, criteria: updatedCriteria });
  };

  // Validate weights summing to 1
  useEffect(() => {
    const totalWeight = decisionState.criteria.reduce(
      (total, criterion) => total + criterion.weight,
      0
    );
    setWeightsValid(totalWeight === 1);
  }, [decisionState.criteria]);

  // Handle click action on Update Criteria button
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
            gridTemplate: `"result result result result option"
                            "result result result result ranking"
                            "result result result result ranking"
                            ". . save save ranking"
                            `,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{
            borderRadius: 1,
            display: "flex",
            flexDirection: "row",
            gap: 2,
            padding: 2.5,

          }}>
            <Box
              sx={{
                gridArea: "result",
                width: '138vh',
                height: '55vh',

              }}
            >
              <Container>
                <Typography variant="h4" gutterBottom>
                  Evaluate Criteria
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
                    The weights must sum to 1. Please adjust the values.
                  </Alert>
                )}
              </Container>
            </Box>
            <Box sx={{
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 2.5,

              width: '43vh'
            }}>
              <Box
                sx={{
                  gridArea: "option",
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: 3,
                  backgroundColor: "white",
                  height: '10vh'
                }}
              >
                <NavLink
                  to="/OtherNewCriteria"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button onClick={handleClick} variant="contained">
                    Update Criteria
                  </Button>
                </NavLink>
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
                  height: '40vh'
                }}
              >
                <Typography
                  variant="body1"
                  alignSelf="flex-start"
                  sx={{ fontWeight: "800" }}
                >
                  Criteria
                </Typography>
                {decisionState.criteria.map((criterion) => (
                  <Stack
                    key={criterion.name}
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
                        <Typography variant="body1">{criterion.name}</Typography>
                        <Button variant="contained">Delete Criteria</Button>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Box>
            </Box>
          </Box>


        </Box>
        <Box sx={{
          borderRadius: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: '3',
          marginTop: '3vh',
          marginBottom:'2vh',
        }}>
          <NavLink
            to="/NewOption"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button sx={{ width: '50vh' }} variant="contained">Proceed</Button>
          </NavLink>
        </Box>

      </Container>
    </Layout>
  );
};

export default CriteriaPage;
