
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


import Button from "@mui/material/Button";


import Layout from "../components/Layout";

import AdsClickIcon from "@mui/icons-material/AdsClick";
import { NavLink } from "react-router-dom";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import CustomButton from "../components/Button";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";

import { DecisionStateContext } from "../contexts/DecisionStateContext";
import { useContext, useEffect, useState } from "react";

const CriteriaPage = () => {
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);
  const [weightsValid, setWeightsValid] = useState(true);


  // Update criterion weight in decisionState
  const options = ["Cost", "Safety", "Maintenance"];



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
      <Container sx={{ paddingY: 2 }}>
        <Box
          sx={{

            display: "grid",

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
                  The weights must sum to 1. Please adjust the values.
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
