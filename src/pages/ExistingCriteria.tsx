import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Stack,
  Typography,
  Box,
  TextField,
  Grid,
  Paper,
  Snackbar,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import { DecisionStateContext } from "../contexts/DecisionStateContext";
import TargetIcon from "@mui/icons-material/Adjust";
import { supabase } from "../supabase/supabaseClient";
import DecisionState from "../components/interfaces/DecisionState";

interface ItemProps {
  selected: boolean;
}

const Item = styled(Paper)<ItemProps>(({ theme, selected }) => ({
  backgroundColor: selected
    ? theme.palette.primary.main
    : theme.palette.mode === "dark"
    ? "#1A2027"
    : "#fff",
  padding: theme.spacing(3),
  textAlign: "center",
  color: selected ? "#fff" : theme.palette.text.secondary,
  width: "300px",
  height: "200px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
  borderRadius: "12px",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 8px rgba(0,0,0,0.2)"
      : "0 4px 8px rgba(0,0,0,0.1)",
  "&:hover": {
    transform: "scale(1.03)",
    backgroundColor: selected
      ? theme.palette.primary.main
      : theme.palette.mode === "dark"
      ? "#29303b"
      : "#f0f0f0",
  },
}));

const NewCriteriaPage: React.FC = () => {
  const [formData, setFormData] = useState({ criteria: "" });
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);
  const [criteria, setCriteria] = useState<string[]>([]);
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const { handleNavigation } = useBreadcrumbs();

  const updateDecisionState = (updatedProperties: Partial<DecisionState>) => {
    setDecisionState((prevState) => ({
      ...prevState,
      ...updatedProperties,
    }));
  };

  const handleAddCriteria = () => {
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
    setSuccessMessageOpen(true); // Show success message
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

  useEffect(() => {
    fetchCriteria();
  }, []);

  return (
    <Layout>
      <Stack>
        <Box ml={2} mt={2}>
          <BackButton />
        </Box>
      </Stack>

      <Container>
        <Stack spacing={4} alignItems="center" justifyContent="center">
          <Typography variant="h3" align="center">
            Select Existing or Add New Criteria
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              name="criteria"
              label="Search Criteria"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCriteria}
              startIcon={<AddIcon />}
            >
              Add Custom Criteria
            </Button>
          </Stack>

          <Grid container spacing={4} justifyContent="center">
            {criteria.map((crit, index) => (
              <Grid item key={index}>
                <Item
                  onClick={() => handleSelectCriteria(crit)}
                  selected={selectedCriteria.includes(crit)}
                >
                  <Stack alignItems="center">
                    <TargetIcon style={{ fontSize: "56px", padding: "2" }} />
                    <Typography variant="h5">{crit}</Typography>
                  </Stack>
                </Item>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginTop: 4 }}
          >
            Submit Criteria
          </Button>
        </Stack>
      </Container>

      <Snackbar
        open={successMessageOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessMessageOpen(false)}
        message="Criteria successfully selected!"
      />
    </Layout>
  );
};

export default NewCriteriaPage;
