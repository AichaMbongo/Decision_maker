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

interface Criterion {
  name: string;
  weight: number;
  comparisons: Record<string, Record<string, number>>;
}

interface Decision {
  id: number;
  name: string;
  description: string;
  criteria: Criterion[];
}

const PreviousDecisions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [filteredDecisions, setFilteredDecisions] = useState<Decision[]>([]);
  const [currentDecision, setCurrentDecision] = useState<Decision | null>(null);

  useEffect(() => {
    fetchDecisions();
  }, []);

  const fetchDecisions = async () => {
    try {
      const { data, error } = await supabase.from("decisions").select("*");
      if (error) {
        console.error("Error fetching decisions:", error.message);
        return;
      }
      if (data) {
        setDecisions(data);
      }
    } catch (error) {
      console.error("Error fetching decisions:");
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
      const filtered = decisions.filter((decision) =>
        decision.name.toLowerCase().includes(normalizedQuery)
      );
      if (filtered.length === 0) {
        setFilteredDecisions([
          {
            id: 0,
            name: "No decision found",
            description: "No decision matches your search.",
            criteria: [],
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
    setCurrentDecision(decision);
  };
console.log("Decisions", decisions);
  const closeModal = () => {
    setCurrentDecision(null);
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
        <Stack className="stack-container" alignItems="center">
          <Typography variant="h3" align="center">
            List of Previous Decisions
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "2vh",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <TextField
              value={searchQuery}
              onChange={handleSearchChange}
              label="Search previous decisions"
              variant="standard"
              size="small"
              sx={{ marginRight: 2, width: "35vh" }}
            />
            <Button variant="contained" onClick={handleSearchSubmit}>
              <Search />
            </Button>
            <Button
              variant="outlined"
              onClick={clearSearchResults}
              sx={{ marginLeft: 2 }}
            >
              Clear
            </Button>
          </Box>
          <Box mt={8}>
            <NavLink
              to="/newDecision"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button variant="contained" color="primary" endIcon={<AddIcon />}>
                Add New Decision
              </Button>
            </NavLink>
          </Box>
        </Stack>

        <Grid container spacing={2} justifyContent="center">
          {(filteredDecisions.length > 0 ? filteredDecisions : decisions).map(
            (decision, index) => (
              <Grid item xs={12} sm={6} md={3} key={decision.id}>
                <Paper
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff",
                    padding: 3,
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  <Stack
                    gap={2}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <PsychologyOutlinedIcon style={{ fontSize: "56px" }} />
                    <Stack>
                      <Typography variant="subtitle1">
                        {decision.name}
                      </Typography>
                      <Typography variant="body1">
                        <Button
                          onClick={() => handleSeeCriteria(decision)}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          See criteria
                        </Button>
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            )
          )}
        </Grid>

        <Modal
          open={Boolean(currentDecision)}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={Boolean(currentDecision)}>
            <Box
              sx={{
                backgroundColor: "white",
                boxShadow: 24,
                padding: 3,
                maxWidth: 600,
                margin: "auto",
                marginTop: "10vh",
                borderRadius: 8,
              }}
            >
              <Typography variant="h5" id="modal-modal-title">
                {currentDecision?.name} Criteria
              </Typography>
              {currentDecision?.criteria && (
                <ul>
                  {currentDecision.criteria.map((criterion, index) => (
                    <li key={index}>{criterion.name}</li>
                  ))}
                </ul>
              )}
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
