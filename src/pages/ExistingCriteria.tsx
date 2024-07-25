import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Stack,
  Typography,
  Box,
  TextField,
  Snackbar,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear"; // Import ClearIcon for the "Clear Search" button
import AddIcon from "@mui/icons-material/Add";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import { DecisionStateContext } from "../contexts/DecisionStateContext";
import { supabase } from "../supabase/supabaseClient";
import DecisionState from "../components/interfaces/DecisionState";

interface CriteriaCategories {
  [key: string]: string[];
}

const StyledChip = styled(Chip)<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: isSelected ? "#4caf50" : theme.palette.background.paper,
  color: isSelected ? "#fff" : theme.palette.text.primary,
  "&:hover": {
    backgroundColor: isSelected ? "#388e3c" : theme.palette.action.hover,
  },
}));

const NewCriteriaPage: React.FC = () => {
  const [formData, setFormData] = useState({ criteria: "" });
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);
  const [criteria, setCriteria] = useState<string[]>([]);
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<CriteriaCategories>({});

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
    if (selectedCriteria.includes(criteria)) {
      console.log(`Criteria "${criteria}" is already selected.`);
      return;
    }

    const newCriterion = { name: criteria, weight: 1, comparisons: {} };
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
    handleNavigation("/OtherNewCriteria", "Add Another Criteria");
    console.log("Submit criteria");
  };

  const fetchCriteriaCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("criteria_categories")
        .select("*");
  
      if (error) {
        console.error("Error fetching criteria categories:", error);
        return;
      }
  
      console.log("Fetched data:", data); // Log fetched data
  
      // Transform the data into the expected format
      const categories: CriteriaCategories = {};
      data?.forEach((item: any) => {
        // Assuming item.criteria is already an array
        categories[item.category_name] = item.criteria; 
      });
  
      console.log("Formatted categories:", categories); // Log formatted categories
  
      setFilteredCategories(categories);
    } catch (error) {
      console.error("Error fetching criteria categories:", error);
    }
  };
  
  
  

  useEffect(() => {
    fetchCriteriaCategories();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      fetchCriteriaCategories(); // Refresh categories when search is cleared
      return;
    }

    const filtered = Object.entries(filteredCategories).reduce(
      (acc, [category, items]) => {
        const filteredItems = items.filter((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (
          category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          filteredItems.length > 0
        ) {
          acc[category] = filteredItems.length > 0 ? filteredItems : items;
        }
        return acc;
      },
      {} as CriteriaCategories
    );

    console.log("Filtered categories:", filtered); // Log filtered categories

    setFilteredCategories(filtered);
  }, [searchTerm, filteredCategories]);

  const isEmpty = Object.keys(filteredCategories).every(
    (key) => filteredCategories[key].length === 0
  );

  return (
    <Layout>
      <Stack>
        <Box ml={2} mt={2}>
          <BackButton />
        </Box>
      </Stack>

      <Container>
        <Stack
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "calc(100vh - 64px)", position: "relative" }}
        >
          <Typography variant="h4" align="center">
            Select or Add Criteria
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%", position: "sticky", top: 0, backgroundColor: "background.paper", padding: 2, zIndex: 1 }}
          >
            <TextField
              name="criteria"
              label="Search Criteria"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <>
                    <SearchIcon />
                    {searchTerm && (
                      <Button
                        onClick={() => setSearchTerm("")}
                        sx={{ marginLeft: 1 }}
                      >
                        <ClearIcon />
                      </Button>
                    )}
                  </>
                ),
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

          <Box
            sx={{
              width: "100%",
              maxHeight: "400px", // Limit the height for scrolling
              overflowY: "auto",  // Enable vertical scrolling
              marginTop: 2,
            }}
          >
            {isEmpty ? (
              <Typography variant="h6" color="error" align="center">
                No criteria found for "{searchTerm}"
              </Typography>
            ) : (
              Object.entries(filteredCategories).map(([category, items]) => (
                <Accordion key={category} sx={{ width: "100%" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${category}-content`}
                    id={`${category}-header`}
                  >
                    <Typography variant="h6">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {items.map((crit, index) => (
                        <ListItem key={index} button onClick={() => handleSelectCriteria(crit)}>
                          <ListItemText
                            primary={
                              <StyledChip
                                label={crit}
                                isSelected={selectedCriteria.includes(crit)}
                              />
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ position: "absolute", bottom: 16 }}
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
