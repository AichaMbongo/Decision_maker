import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Stack,
  Typography,
  Box,
  TextField,
  FormControl,
} from "@mui/material";
import BackButton from "../components/BackButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Layout from "../components/Layout";

import CustomButton from "../components/Button";
import { NavLink } from "react-router-dom";
import DecisionState from "../components/interfaces/DecisionState";
import { DecisionStateContext } from "../contexts/DecisionStateContext";

import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";

interface criterion {
  name: string;
  weight: number;
}

const defaultCriterion = {
  name: "",
  weight: 0,
};

const NewCriteria = () => {
  const [formData, setFormData] = useState({ newCriteria: "" });
  const [criterion, setCriterion] = useState<string>("");
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);

  const criteria = decisionState.criteria;
  console.log("New criterion", criterion);

  console.log("OLd criteria", criteria);

  const updateDecisionState = (updatedProperties: Partial<DecisionState>) => {
    console.log("Check if function is being accessed");

    console.log("Updated properties", updatedProperties);
    setDecisionState((prevState) => ({
      ...prevState,
      ...updatedProperties,
    }));
  };

  const handleClick = () => {
    console.log("Button is Clicked");
  };
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const { handleNavigation } = useBreadcrumbs();

  const addCriteria = () => {
    console.log("Clicked", decisionState);
    const newCriterion = { name: criterion, weight: 0 };
    const updatedCriteria = [...decisionState.criteria, newCriterion];
    console.log(updatedCriteria);
    setDecisionState({ ...decisionState, criteria: updatedCriteria });
    console.log("Updated Criteria", decisionState);
    handleNavigation("/OtherNewCriteria", "Add Another Criteria");
  };

  return (
    <Layout>
      <div style={{ marginLeft: "30px" }}>
        <BackButton />
      </div>

      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Stack className="stack-container">
          <Typography variant="h3" align="center">
            Type in a New Criteria
          </Typography>

          <Stack
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            style={{ marginBottom: "78px", padding: 3, marginTop: "10px" }}
          >
            <FormatListBulletedIcon
              style={{ fontSize: "56px", padding: "2" }}
            />
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                component="div"
                sx={{
                  "& > :not(style)": { m: 1, width: "50ch" },
                }}
              >
                <TextField
                  id="filled-basic"
                  name="newCriteria"
                  label="ie. Cost, Comfort"
                  variant="filled"
                  value={criterion}
                  onChange={(e) => setCriterion(e.target.value)}
                />
              </Box>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "16px",
                  paddingRight: 2,
                  paddingLeft: 2,
                  marginBottom: 2,
                  minWidth: "200px", // Adjust the width as desired
                }}
                onClick={addCriteria}
                type="submit"
              >
                Enter New Criteria
              </Button>
            </div>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default NewCriteria;
