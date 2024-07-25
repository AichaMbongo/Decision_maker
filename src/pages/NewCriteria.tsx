import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Stack,
  Typography,
  Box,
  TextField,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import BackButton from "../components/BackButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Layout from "../components/Layout";
import CustomButton from "../components/Button";
import { DecisionStateContext } from "../contexts/DecisionStateContext";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";

interface criterion {
  name: string;
  weight: number;
  comparisons: object;
}

const defaultCriterion = {
  name: "",
  weight: 1,
  comparisons: {},
};

const NewCriteria = () => {
  const [formData, setFormData] = useState({ newCriteria: "" });
  const [criterion, setCriterion] = useState<string>("");
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const criteria = decisionState.criteria;

  const navigate = useNavigate();

  const { handleNavigation } = useBreadcrumbs();

  const addCriteria = () => {
    const newCriterion = { name: criterion, weight: 1, comparisons: {} };
    const updatedCriteria = [...decisionState.criteria, newCriterion];

    setDecisionState({ ...decisionState, criteria: updatedCriteria });

    handleNavigation("/OtherNewCriteria", "Add Another Criteria");
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
          }}
        >
          <Typography variant="h3" align="center">
            Type in a New Criteria
          </Typography>
          <Stack alignItems="center" sx={{ mt: 2 }}>
            <FormatListBulletedIcon
              style={{ fontSize: "56px", padding: "2" }}
            />
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 2, mb: isMobile ? 4 : 8, px: isMobile ? 2 : 3 }}
          >
            <Box
              sx={{
                width: "100%",
                "& > :not(style)": { m: 1 },
              }}
            >
              <TextField
                id="filled-basic"
                name="newCriteria"
                label="ie. Cost, Comfort"
                variant="filled"
                value={criterion}
                onChange={(e) => setCriterion(e.target.value)}
                fullWidth
              />
            </Box>
            <Button
              variant="contained"
              sx={{
                borderRadius: "16px",
                paddingRight: 2,
                paddingLeft: 2,
                marginBottom: 2,
                minWidth: "200px",
              }}
              onClick={addCriteria}
              type="submit"
            >
              Enter New Criteria
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Layout>
  );
};

export default NewCriteria;
