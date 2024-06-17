import { Box, Container, FormControlLabel, Stack, Switch } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Layout from "../components/Layout";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import BackButton from "../components/BackButton";
import { NavLink } from "react-router-dom";
import CustomButton from "../components/Button";
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
            display: "grid",
            gap: 1,
            padding: 2,
            boxShadow: 3,
            backgroundColor: "white",
            gridTemplateColumns: { xs: "1fr", md: "3fr 1fr" },
            gridTemplateRows: { xs: "auto", md: "auto 1fr auto" },
            gridTemplateAreas: {
              xs: `"result" "option" "ranking" "save"`,
              md: `"result option" "result ranking" "result save"`,
            },
          }}
        >
          <Box sx={{ gridArea: "result" }}>
            <PairwiseComparison />
          </Box>
          <Box
            sx={{
              gridArea: "option",
              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: 3,
              backgroundColor: "white",
              mt: { xs: 2, md: 0 },
            }}
          >
            <Button variant="contained">Add Criteria</Button>
          </Box>
          <Box
            sx={{
              gridArea: "ranking",
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 2.5,
              boxShadow: 3,
              backgroundColor: "white",
              mt: { xs: 2, md: 0 },
            }}
          >
            <Typography
              variant="body1"
              alignSelf="flex-start"
              sx={{
                fontWeight: "800",
              }}
            >
              Criteria
            </Typography>
            {decisionState.options.map((option) => (
              <Stack
                gap={3}
                direction="column"
                justifyContent="center"
                key={option}
              >
                <Stack
                  gap={2}
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <AdsClickIcon style={{ fontSize: "56px", padding: "2" }} />
                  <Stack>
                    <Typography variant="body1">{option}</Typography>
                    <Button variant="contained">Edit Criteria</Button>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Box>
          <Box
            sx={{
              gridArea: "save",
              mt: { xs: 2, md: 0 },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <NavLink
              to="/ResultsPage"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CustomButton onClick={Results}>PROCEED</CustomButton>
            </NavLink>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default EvaluateOptions;
