import React, { useState, useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import Layout from "../components/Layout";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import BasicTextField from "../components/input-field";
import { Field } from "../components/interfaces/InputFieldProps";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import BackButton from "../components/BackButton";
import { DecisionStateContext } from "../contexts/DecisionStateContext";
import DecisionState from "../components/interfaces/DecisionState";

const NewDecision: React.FC = () => {
  const [decision, setDecision] = useState<string>("");
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fields: Field[] = [
    {
      id: "filled-basic",
      label: 'E.g. "To Buy a Car"',
      variant: "filled",
      defaultValue: "",
      name: "decision",
      value: decision,
      onChange: (e) => {
        setDecision(e.target.value);
      },
    },
  ];

  const decisionObject: Partial<DecisionState> = {
    decision: decision,
  };

  const updateDecisionState = (updatedProperties: Partial<DecisionState>) => {
    setDecisionState((prevState) => ({
      ...prevState,
      ...updatedProperties,
    }));
  };

  const { handleNavigation } = useBreadcrumbs();
  const EnterNewCriteria = () => {
    updateDecisionState(decisionObject);
    handleNavigation("/newCriteria", "New Criteria");
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
        textAlign="center"
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
          <Stack
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h3">
              Let us Begin With The End in Mind.
            </Typography>
            <Typography variant="h3">What is Your Goal?</Typography>
            <GolfCourseIcon sx={{ fontSize: 40 }} />
            <BasicTextField fields={fields} />
            <Button
              variant="contained"
              sx={{
                borderRadius: "16px",
                paddingRight: 2,
                paddingLeft: 2,
                marginBottom: 2,
                minWidth: "200px", // Adjust the width as desired
              }}
              onClick={EnterNewCriteria}
              type="submit"
            >
              PROCEED
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Layout>
  );
};

export default NewDecision;
