import { Box, Container, FormControlLabel, Stack, Switch } from "@mui/material";
import Typography from "@mui/material/Typography";
// import { error } from 'console';
import Button from "@mui/material/Button";
import Layout from "../components/Layout";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import BackButton from "../components/BackButton";
import { NavLink } from "react-router-dom";
import CustomButton from "../components/Button";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import { useContext, useEffect, useState } from "react";
import { Criterion } from "../components/interfaces/DecisionState";
import { DecisionStateContext } from "../contexts/DecisionStateContext";
import PairwiseComparison from "../components/PairwiseComparison";

interface Comparison {
  [option: string]: {
    [otherOption: string]: number;
  };
}

interface AggregatedPreference {
  [option: string]: number;
}

const EvaluateOptions = () => {
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);
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
        console.log(decisionState);
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
  };

  console.log(decisionState);
  const { handleNavigation } = useBreadcrumbs();
  const Results = () => {
    handleNavigation("/ResultsPage", "Results");
  };
  return (
    <Layout>
      <Stack style={{ margin: '2vh' }}>
        <div style={{ marginLeft: "30px" }}>
          <BackButton />
        </div>
      </Stack>

      <Container
        sx={{
          display: "100vh",
          paddingTop: "2",
        }}
      >
        <Box
          sx={{
            height: "65vh",
            width: "100%",
            gap: 1,
            padding: 2,
            boxShadow: 3, // Added shadow effect
            backgroundColor: "white",
            gridTemplate: `"result result result result option"
                        "result result result result ranking"
                        "result result result result ranking"
                        ". . save save ranking"
                        `,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{
            borderRadius: 1,
            display: "flex",
            flexDirection: "row",
            gap: 2,
            padding: 2.5,
          }}>
            <Box
              sx={{
                gridArea: "result",
                width: '138vh',
              }}
            >
              <PairwiseComparison />
            </Box>

            <Box sx={{
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 2.5,
              width: '43vh'
            }}>
              <Box
                sx={{
                  gridArea: "option",
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: 3,
                  backgroundColor: "white",
                  height: '10vh'
                }}
              >
                <NavLink
                  to="/OtherNewCriteria"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button variant="contained">
                    Update Options
                  </Button>
                </NavLink>
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
                  height: '40vh'
                }}
              >
                <Typography
                  variant="body1"
                  alignSelf="flex-start"
                  sx={{ fontWeight: "800" }}
                >
                  Options
                </Typography>


                {decisionState.options.map((option) => (
                  <Stack
                    key={option}
                    gap={3}
                    direction="column"
                    justifyContent="center"
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
                        <NavLink
                          to="/OtherNewOption"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <Button variant="contained">Edit Option</Button>
                        </NavLink>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Box>
            </Box>
          </Box>

          <Box sx={{
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: '3',
            
          }}>
            <NavLink
              to="/ResultsPage"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button sx={{ width: '50vh' }} variant="contained">Proceed</Button>
            </NavLink>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default EvaluateOptions;
