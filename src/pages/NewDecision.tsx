import React from "react";
import { Box, Grid, Typography, Stack, Button } from "@mui/material";
import Layout from "../components/Layout";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import CustomButton from "../components/Button";
import BasicTextField from "../components/input-field";
import { Field } from "../components/interfaces/InputFieldProps";
import { NavLink } from "react-router-dom";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import BackButton from "../components/BackButton";
import { DecisionStateContext } from "../contexts/DecisionStateContext";
import { useContext, useState } from "react";
import DecisionState from "../components/interfaces/DecisionState";

//add some temporary links here to enable viewing of pages

const NewDecision: React.FC = () => {
  const [decision, setDecision] = useState<string>("");
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);

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

  // const handleClick = () => {
  //   console.log("Button is Clicked");
  //   console.log(decisionState);
  //   decisionState.decision = decision
  //   // updateDecisionState(decisionObject);
  //   console.log("After the update")
  //   console.log(decisionState)

  // }

  const { handleNavigation } = useBreadcrumbs();
  const EnterNewCriteria = () => {
    updateDecisionState(decisionObject);
    handleNavigation("/newCriteria", "New Criteria");
  };

  return (
    <Layout>
      <Stack style={{margin:'2vh'}}>
        <div style={{ marginLeft: "30px" }}>
          {" "}
          <BackButton />
        </div>
      </Stack>
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        textAlign="center"
        justifyContent="center"
        style={{ marginBottom: "154px", padding: 3, marginTop: "10px" }}
      >
        <Stack className="stack-container">
          <Grid lg={6}>
            <Box>
              <Typography variant="h3">
                Let us Begin With The End in Mind.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h3">What is Your Goal?</Typography>
            </Box>
            <Box>
              <GolfCourseIcon
                sx={{
                  fontSize: 40,
                }}
              />
            </Box>
            <Box>
              <BasicTextField fields={fields} />
            </Box>
            <Box mt={2} width={100} alignItems="center"></Box>
          </Grid>
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

          {/* <NavLink  style={{ textDecoration: 'none', color: 'inherit' }}>

      <CustomButton onClick={EnterNewCriteria}>
        PROCEED
        </CustomButton>
  </NavLink> */}
        </Stack>
      </Stack>
    </Layout>
  );
};

export default NewDecision;
