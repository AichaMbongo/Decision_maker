import React, { useState, useContext } from "react";
import {
  Button,
  Stack,
  Typography,
  Box,
  TextField,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import CustomButton from "../components/Button";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import DecisionState from "../components/interfaces/DecisionState";
import { DecisionStateContext } from "../contexts/DecisionStateContext";

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

  console.log("Decision state on page", decisionState);

  const { handleNavigation } = useBreadcrumbs();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      <Stack sx={{ margin: isMobile ? "0" : "0 30px", p: 2 }}>
        <BackButton />
      </Stack>
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ p: 2, mx: 2 }}
      >
        <Paper
          sx={{
            p: isMobile ? 2 : 4,
            boxShadow: 3,
            width: "100%",
            maxWidth: "600px",
            margin: "auto",
            mx: 2,
          }}
        >
          <Typography variant="h3" align="center">
            Do you want to Add Another Criteria?
          </Typography>
          <Stack alignItems="center" sx={{ mt: 2 }}>
            <PsychologyAltIcon style={{ fontSize: "56px", padding: "2" }} />
          </Stack>
          <Stack
            sx={{
              p: 1,
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <CustomButton onClick={handleYesClick}>Yes</CustomButton>
            <CustomButton onClick={EvaluateCriteria}>No</CustomButton>
          </Stack>
          <Box sx={{ display: "flex", alignItems: "flex-end", mt: 2 }}>
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              name="criteria"
              label="Search Criteria..."
              variant="standard"
              fullWidth
            />
          </Box>
        </Paper>
      </Stack>
      <Stack sx={{ p: 1, mx: 2 }} gap={4} direction="column">
        <Grid
          container
          padding={isMobile ? 2 : 4}
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {decisionState.criteria.map((crit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Item>
                <Stack
                  gap={2}
                  direction={isMobile ? "column" : "row"}
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
