import React, { useState, useContext } from "react";
import {
  Button,
  Stack,
  Typography,
  Box,
  TextField,
  Grid,
  Paper,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import CustomButton from "../components/Button";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import DecisionState from "../components/interfaces/DecisionState";
import { DecisionStateContext } from "../contexts/DecisionStateContext";

const criteria = [
  "Cost",
  "Comfort",
  "Safety",
  "Good Insurance",
  "Comfy Seats",
  "Nice Speakers",
];

const handleClick = () => {
  console.log("Button is Clicked");
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const OtherNewCriteria: React.FC = () => {
  const [formData, setFormData] = useState({ criteria: "" });
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);

  const criteria2 = decisionState.criteria;

  console.log("Decision state on page", criteria2);

  const { handleNavigation } = useBreadcrumbs();

  const updateDecisionState = (updatedProperties: Partial<DecisionState>) => {
    setDecisionState((prevState) => ({
      ...prevState,
      ...updatedProperties,
    }));
  };

  const handleDelete = (id: number) => {
    console.log(id);
    console.log("Criteria:", criteria2);
    criteria2.splice(id, 1);
    console.log("Updated criteria: ", criteria2);
    updateDecisionState({ criteria: criteria2 });
  };

  const handleYesClick = () => {
    handleNavigation("/newCriteria", "New Criteria");
  };

  const EvaluateCriteria = () => {
    handleNavigation("/EvaluateCriteriaPage", "Evaluate Criteria");
  };

  return (
    <Layout>
      <Stack>
        <div style={{ marginLeft: "30px" }}>
          {" "}
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
            Do you want to Add Another Criteria?
          </Typography>
          <PsychologyAltIcon style={{ fontSize: "56px", padding: "2" }} />
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              "& > :not(style)": {
                m: 1,
                width: { xs: "100%", sm: "75%", md: "75%" },
              },
            }}
            noValidate
            autoComplete="off"
        
          ></Box> */}

          <Stack
            sx={{ p: 1 }}
            gap={6}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{ marginBottom: "30px" }}
          >
            {/* <NavLink
              to="/newCriteria"
              style={{ textDecoration: "none", color: "inherit" }}
            > */}
            <Button
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleYesClick}
            >
              Yes
            </Button>
            {/* </NavLink>
            <NavLink
              to="/EvaluateCriteriaPage"
              style={{ textDecoration: "none", color: "inherit" }}
            > */}
            <Button
              style={{ textDecoration: "none", color: "primary" }}
              onClick={EvaluateCriteria}
            >
              No
            </Button>
            {/* </NavLink> */}
          </Stack>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              name="criteria"
              label="Search Criteria..."
              variant="standard"
            />
          </Box>
        </Stack>
      </Stack>

      <Stack sx={{ p: 1 }} gap={4} direction="column">
        <Grid
          container
          padding={4}
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {decisionState.criteria.map((crit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Item>
                <Stack
                  gap={2}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <AdsClickIcon style={{ fontSize: "56px", padding: "2" }} />
                  <Stack>
                    <Typography variant="body1">{crit.name}</Typography>
                    <Typography variant="body1">{index}</Typography>
                    <Button
                      onClick={() => handleDelete(index)}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Stack>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Layout>
  );
};

export default OtherNewCriteria;
