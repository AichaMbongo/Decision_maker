import { Box, Container, Stack } from "@mui/material";
import { useContext, useEffect } from "react";
import Typography from "@mui/material/Typography";
// import { error } from 'console';
import Button from "@mui/material/Button";
import Layout from "../components/Layout";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import BackButton from "../components/BackButton";
import { DecisionStateContext } from "../contexts/DecisionStateContext";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import { NavLink } from "react-router-dom";
import CustomButton from "../components/Button";
import BarChartComponent from "../components/interfaces/BarChartComponent";
import { supabase } from "../supabase/supabaseClient";
import { getUser, getUserId } from "../supabase/auth";

interface TotalScores {
  [option: string]: number;
}
const ResultsPage = () => {
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);
  const totalScores: TotalScores = {};

  console.log(decisionState);
  console.log("Total Scores", totalScores);
  console.log("Option 1", decisionState.aggregatedPreferences[0]);
  useEffect(() => {
    const calculateTotalScores = () => {
      // Initialize total scores with 0 for each option
      decisionState.options.forEach((option) => {
        totalScores[option] = 0;
      });

      decisionState.criteria.forEach((criterion) => {
        const criterionAggregated =
          decisionState.aggregatedPreferences[criterion.name];
        console.log("Aggregated criteria:", criterionAggregated);
        console.log("Criterion weight", criterion.weight);

        // Update total scores with weighted sum
        decisionState.options.forEach((option) => {
          totalScores[option] += criterionAggregated[option] * criterion.weight;
          console.log("Current", totalScores[option]);
        });
      });
    };

    calculateTotalScores();
    decisionState.totalScores = totalScores
    console.log(decisionState);
    console.log("Total scores totality", totalScores);
  }, [
    decisionState.criteria,
    decisionState.aggregatedPreferences,
    decisionState.options,
  ]);

  const { handleNavigation } = useBreadcrumbs();
  const ViewPreviousDecisions = async () => {
    
    const user =  await getUserId();

    // need to add something to redirect to login if not logged in
    
    const { data, error } = await supabase
      .from("decisions")
      .insert([
        {
          user_id: user,
          decision: decisionState,
        },
      ])
      .select();

  
          
   handleNavigation("/PreviousDecison", "Previous Decision");
  };
  return (
    <Container>
      <Stack>
        <div style={{ marginLeft: "30px" }}>
          {" "}
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
            display: "grid",
            height: "80vh",
            width: "100%",

            gap: 1,
            padding: 2,
            boxShadow: 3,
            backgroundColor: "white",

            gridTemplate: `"result result result result option"
                "result result result result ranking"
                "result result result result ranking"
                ". . save save ranking"
                `,
          }}
        >
          <Box
            sx={{
              gridArea: "result",
            }}
          >
            <Container sx={{ marginTop: 4 }}>
              <BackButton />
              <Typography variant="h4" gutterBottom>
                Results
              </Typography>
              {decisionState.criteria.map((criterion, index) => (
                <Box key={index} sx={{ marginBottom: 4 }}>
                  <Typography variant="h6">{criterion.name}</Typography>
                  <BarChartComponent criterion={criterion.name} />
                </Box>
              ))}
              <Box sx={{ marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Total Scores
                </Typography>
                {Object.keys(totalScores).map((option) => (
                  <Typography key={option} variant="body1">
                    {`${option}: ${totalScores[option]}`} SHit
                  </Typography>
                ))}
              </Box>
            </Container>
          </Box>
          <Box
            sx={{
              gridArea: "option",

              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: 3, // Added shadow effect
              backgroundColor: "white",
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
              boxShadow: 3, // Added shadow effect
              backgroundColor: "white",
            }}
          >
            <Typography variant="body1" alignSelf="flex-start">
              Criteria
            </Typography>
            {decisionState.options.map((option) => (
              <Stack gap={3} direction="column" justifyContent="center">
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
            }}
          >

              <CustomButton onClick={ViewPreviousDecisions}>
                Save Decision
              </CustomButton>
          </Box>
        </Box>
      </Container>
    </Container>
  );
  // return <div></div>;shi
};

export default ResultsPage;
