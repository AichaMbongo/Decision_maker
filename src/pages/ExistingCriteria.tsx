import React, { useState, useContext, useEffect } from "react";
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
import { supabase } from "../supabase/supabaseClient";

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
  const [criteria, setCriteria] = useState<string[]>([]);
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);

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
    handleNavigation("/newCriteria", "Add Criteria");
    console.log("Add new criteria");
  };

  const handleSelectCriteria = (criteria: string) => {
    // Handle selecting criteria logic here
    if (selectedCriteria.includes(criteria)) {
      console.log(`Criteria "${criteria}" is already selected.`);
      return;
    }

    const newCriterion = { name: criteria, weight: 0, comparisons: {} };
    const updatedCriteria = [...decisionState.criteria, newCriterion];
    setDecisionState({ ...decisionState, criteria: updatedCriteria });

    setSelectedCriteria((prevSelectedCriteria) => [
      ...prevSelectedCriteria,
      criteria,
    ]);

    console.log(`Selected criteria: ${criteria}`);
  };

  const handleSubmit = () => {
    // Handle submitting criteria logic here
    handleNavigation("/OtherNewCriteria", "Add Another Criteria");
    console.log("Submit criteria");
  };

  const fetchCriteria = async () => {
    try {
      const { data, error } = await supabase
        .from("example_criteria")
        .select("criteria");

      if (!error && data) {
        setCriteria(data.map((item: any) => item.criteria));
      } else {
        console.error("Error fetching criteria:", error);
      }
    } catch (error) {
      console.error("Error fetching criteria:", error);
    }
  };
  console.log(decisionState)
  useEffect(() => {
    fetchCriteria();
  }, []);

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
              Add Custom Criteria
            </Button>
          </Stack>

          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ marginTop: 4 }}
          >
            {criteria.map((crit, index) => (
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
