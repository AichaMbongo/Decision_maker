import { Box, Container, Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import { NavLink } from "react-router-dom";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import { useContext, useState } from "react";
import { DecisionStateContext } from "../contexts/DecisionStateContext";
import PairwiseComparison from "../components/PairwiseComparison";

const EvaluateOptions = () => {
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);
  const { handleNavigation } = useBreadcrumbs();
  const [criterionIndex, setCriterionIndex] = useState(0);
  const [combinationIndex, setCombinationIndex] = useState(0);

  const handleComparisonChange = (
    criterionIndex: number,
    option1: string,
    option2: string,
    value: boolean
  ) => {
    const updatedCriteria = decisionState.criteria.map((criterion, i) => {
      if (i === criterionIndex) {
        return {
          ...criterion,
          comparisons: {
            ...criterion.comparisons,
            [option1]: {
              ...criterion.comparisons[option1],
              [option2]: !value ? 1 : 0,
            },
          },
        };
      }
      return criterion;
    });

    setDecisionState({ ...decisionState, criteria: updatedCriteria });
  };

  const Results = () => {
    handleNavigation("/ResultsPage", "Results");
  };

  return (
    <Layout>
      <Stack sx={{ margin: { xs: "2vh", md: "2vh 30px" } }}>
        <BackButton />
      </Stack>
      <Container sx={{ paddingY: 2 }}>
        <Box
          sx={{
            padding: 2,
            boxShadow: 3,
            backgroundColor: "white",
          }}
        >
          <Box sx={{ marginBottom: 2 }}>
            <PairwiseComparison />
          </Box>
          {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
            <NavLink
              to="/ResultsPage"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button sx={{ width: "100%" }} variant="contained">
                Proceed
              </Button>
            </NavLink>
          </Box> */}
        </Box>
      </Container>
    </Layout>
  );
};

export default EvaluateOptions;
