import React, { useState, useContext } from "react";
import {
  Button,
  Stack,
  Typography,
  Box,
  TextField,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import DecisionState from "../components/interfaces/DecisionState";
import { DecisionStateContext } from "../contexts/DecisionStateContext";
import TargetIcon from "@mui/icons-material/Adjust";

const handleClick = () => {
  console.log("Button is Clicked");
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "300px",
  height: "200px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

const NewCriteriaPage: React.FC = () => {
  const [formData, setFormData] = useState({ criteria: "" });
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);

  const criteria2 = decisionState.criteria;

  const { handleNavigation } = useBreadcrumbs();

  const updateDecisionState = (updatedProperties: Partial<DecisionState>) => {
    setDecisionState((prevState) => ({
      ...prevState,
      ...updatedProperties,
    }));
  };

  const handleAddCriteria = () => {
    // Handle adding new criteria logic here
    console.log("Add new criteria");
  };

  const handleSelectCriteria = (criteria: string) => {
    // Handle selecting criteria logic here
    console.log(`Selected criteria: ${criteria}`);
  };

  const handleSubmit = () => {
    // Handle submitting criteria logic here
    console.log("Submit criteria");
  };

  return (
    <Layout>
      <Stack>
        <div style={{ marginLeft: "30px" }}>
          <BackButton />
        </div>
      </Stack>

      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Stack className="stack-container">
          <Typography variant="h3" align="center">
            Awesome Decision! Select Existing/Create New Criteria For The
            Decision.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ marginTop: 2 }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                name="criteria"
                label="Search Anything"
                variant="standard"
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCriteria}
              startIcon={<AddIcon />}
            >
              Add New Criteria
            </Button>
          </Stack>

          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ marginTop: 4 }}
          >
            {["Cost", "Safety", "Comfort"].map((crit, index) => (
              <Grid item key={index}>
                <Item onClick={() => handleSelectCriteria(crit)}>
                  <Stack alignItems="center">
                    <TargetIcon style={{ fontSize: "56px", padding: "2" }} />
                    <Typography variant="body1">{crit}</Typography>
                  </Stack>
                </Item>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginTop: 8 }} // Added space between cards and submit button
          >
            Submit Criteria
          </Button>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ marginTop: 2, padding: 2 }}
      ></Stack>
    </Layout>
  );
};

export default NewCriteriaPage;
