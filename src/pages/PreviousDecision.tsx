import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Paper,
  Button,
  TextField,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import Layout from "../components/Layout";
import AddIcon from "@mui/icons-material/Add";
import BackButton from "../components/BackButton";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import { NavLink } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { supabase } from "../supabase/supabaseClient";

// Define interfaces based on your data structure
interface Criterion {
  name: string;
  weight: number;
  comparisons: Record<string, Record<string, number>>;
}

interface Decision {
  id: number;
  decision:
    | string
    | {
        model: string;
        options: string[];
        results: {};
        criteria: Criterion[];
        totalScores: Record<string, number>;
        aggregatedPreferences: Record<string, Record<string, number>>;
      };
}

const PreviousDecisions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [filteredDecisions, setFilteredDecisions] = useState<Decision[]>([]);
  const [currentDecision, setCurrentDecision] = useState<Decision | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false); // State to manage modal open/close

  useEffect(() => {
    fetchDecisions();
  }, []);

  const fetchDecisions = async () => {
    try {
      const { data, error } = await supabase
        .from("decisions")
        .select("id, decision");

      if (error) {
        console.error("Error fetching decisions:", error.message);
        return;
      }

      if (data) {
        console.log("Fetched decisions:", data);
        setDecisions(data);
      }
    } catch (error) {
      console.error("Error fetching decisions:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    const normalizedQuery = searchQuery.toLowerCase().trim();
    if (normalizedQuery === "") {
      setFilteredDecisions([]);
    } else {
      const filtered = decisions.filter(
        (decision) =>
          decision.decision &&
          typeof decision.decision !== "string" &&
          decision.decision.model.toLowerCase().includes(normalizedQuery)
      );
      if (filtered.length === 0) {
        setFilteredDecisions([
          {
            id: 0,
            decision: "No decision found",
          },
        ]);
      } else {
        setFilteredDecisions(filtered);
      }
    }
  };

  const clearSearchResults = () => {
    setSearchQuery("");
    setFilteredDecisions([]);
  };

  const handleSeeCriteria = (decision: Decision) => {
    console.log("Selected decision:", decision);
    setCurrentDecision(decision);
    setModalOpen(true); // Open modal when decision is selected
  };

  const closeModal = () => {
    setCurrentDecision(null);
    setModalOpen(false); // Close modal when clicking Close button
  };

  return (
    <Layout>
      <Stack sx={{ margin: { xs: "2vh", md: "2vh 30px" } }}>
        <BackButton />
      </Stack>
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Paper
          sx={{
            padding: 3,
            textAlign: "center",
            maxWidth: "100%",
            margin: "auto",
            marginBottom: 2,
          }}
        >
          <Typography variant="h3" align="center">
            List of Previous Decisions
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "2vh",
              width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" },
              margin: "auto",
            }}
          >
            <TextField
              value={searchQuery}
              onChange={handleSearchChange}
              label="Search previous decisions"
              variant="outlined"
              size="small"
              sx={{ marginBottom: 1, width: "100%" }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                onClick={handleSearchSubmit}
                sx={{ marginRight: 1 }}
              >
                <Search />
              </Button>
              <Button
                variant="outlined"
                onClick={clearSearchResults}
                sx={{ marginLeft: 1 }}
              >
                Clear
              </Button>
            </Box>
            <Box mt={2} width="100%">
              <NavLink
                to="/newDecision"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<AddIcon />}
                  fullWidth
                >
                  Add New Decision
                </Button>
              </NavLink>
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={2} justifyContent="center">
          {(filteredDecisions.length > 0 ? filteredDecisions : decisions).map(
            (decision, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={decision.id}>
                <Paper
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff",
                    padding: 3,
                    textAlign: "center",
                  }}
                >
                  <Stack
                    direction="column"
                    alignItems="center"
                    spacing={1}
                    sx={{ minHeight: 140 }}
                  >
                    <PsychologyOutlinedIcon style={{ fontSize: 56 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {typeof decision.decision === "string"
                        ? decision.decision
                        : (decision.decision.options || "").slice(0, 10)}
                    </Typography>

                    <Button
                      onClick={() => handleSeeCriteria(decision)}
                      variant="outlined"
                      color="primary"
                      size="small"
                    >
                      See Criteria
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            )
          )}
        </Grid>

        <Modal
          open={modalOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            style: { zIndex: 999 }, // Adjust z-index to ensure modal is in front of backdrop
          }}
        >
          <Fade in={modalOpen}>
            <Box
              sx={{
                backgroundColor: "white",
                boxShadow: 24,
                padding: 3,
                maxWidth: 600,
                margin: "auto",
                marginTop: "10vh",
                borderRadius: 8,
                position: "relative", // Ensure position is relative for z-index to work
                zIndex: 1000, // Ensure modal content is above backdrop
              }}
            >
              <Typography variant="h5" id="modal-modal-title" align="center">
                {currentDecision?.decision &&
                typeof currentDecision.decision !== "string"
                  ? currentDecision.decision.model
                  : "Decision details are not available"}
              </Typography>
              <Box sx={{ maxHeight: 300, overflowY: "auto", marginTop: 2 }}>
                {currentDecision?.decision &&
                typeof currentDecision.decision !== "string" &&
                currentDecision.decision.criteria ? (
                  currentDecision.decision.criteria.map(
                    (criterion: Criterion, index: number) => (
                      <Typography key={index} variant="body1">
                        {criterion.name}
                      </Typography>
                    )
                  )
                ) : (
                  <Typography variant="body1">
                    Decision details are not available.
                  </Typography>
                )}
              </Box>
              <Button onClick={closeModal} variant="outlined" sx={{ mt: 2 }}>
                Close
              </Button>
            </Box>
          </Fade>
        </Modal>
      </Stack>
    </Layout>
  );
};

export default PreviousDecisions;
