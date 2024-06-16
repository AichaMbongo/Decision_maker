import {
  Box,
  Container,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Layout from "../components/Layout";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import BackButton from "../components/BackButton";
import { DecisionStateContext } from "../contexts/DecisionStateContext";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import CustomButton from "../components/Button";
import BarChartComponent from "../components/interfaces/BarChartComponent";
import { supabase } from "../supabase/supabaseClient";
import { getUserId } from "../supabase/auth";
import Confetti from "react-confetti";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface TotalScores {
  [option: string]: number;
}

interface Criterion {
  name: string;
  weight: number;
}

const ResultsPage = () => {
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);
  const [totalScores, setTotalScores] = useState<TotalScores>({});
  const [bestChoice, setBestChoice] = useState<string>("");
  const [tiebreakerExplanation, setTiebreakerExplanation] =
    useState<string>("");
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => {
    const calculateTotalScores = () => {
      const scores: TotalScores = {};

      // Initialize total scores with 0 for each option
      decisionState.options.forEach((option) => {
        scores[option] = 0;
      });

      decisionState.criteria.forEach((criterion: Criterion) => {
        const criterionAggregated =
          decisionState.aggregatedPreferences[criterion.name];
        console.log("Aggregated criteria:", criterionAggregated);
        console.log("Criterion weight", criterion.weight);

        // Update total scores with weighted sum
        decisionState.options.forEach((option) => {
          scores[option] += criterionAggregated[option] * criterion.weight;
          console.log("Current", scores[option]);
        });
      });

      setTotalScores(scores);
      decisionState.totalScores = scores;

      // Determine the best choice
      const bestOption = determineBestOption(scores, decisionState.criteria);
      setBestChoice(bestOption.choice);
      setTiebreakerExplanation(bestOption.explanation);
      setShowConfetti(true);

      console.log(decisionState);
      console.log("Total scores totality", scores);
    };

    const determineBestOption = (
      scores: TotalScores,
      criteria: Criterion[]
    ) => {
      const maxScore = Math.max(...Object.values(scores));
      const topOptions = Object.keys(scores).filter(
        (option) => scores[option] === maxScore
      );

      if (topOptions.length === 1) {
        return { choice: topOptions[0], explanation: "" };
      }

      // Tiebreaker based on the highest weighted criterion
      const highestWeightCriterion = criteria.reduce(
        (prev: Criterion, current: Criterion) =>
          prev.weight > current.weight ? prev : current
      );

      const topChoice = topOptions.reduce((prev, current) =>
        decisionState.aggregatedPreferences[highestWeightCriterion.name][prev] >
        decisionState.aggregatedPreferences[highestWeightCriterion.name][
          current
        ]
          ? prev
          : current
      );

      const explanation = `The best choice was determined based on the highest weight criterion "${highestWeightCriterion.name}".`;

      return { choice: topChoice, explanation };
    };

    calculateTotalScores();
  }, [
    decisionState.criteria,
    decisionState.aggregatedPreferences,
    decisionState.options,
  ]);

  const { handleNavigation } = useBreadcrumbs();

  const ViewPreviousDecisions = async () => {
    const user = await getUserId();

    const { data, error } = await supabase
      .from("decisions")
      .insert([
        {
          user_id: user,
          decision: decisionState,
        },
      ])
      .select();

    handleNavigation("/PreviousDecision", "Previous Decision");
  };

  const getTotalMaxValue = () =>
    Object.values(totalScores).reduce((a, b) => a + b, 0);
  const convertScoreToOutOfTen = (score: number) =>
    Math.round((score / getTotalMaxValue()) * 10);

  return (
    <Layout>
      {showConfetti && <Confetti recycle={false} />}
      <Container>
        <Stack>
          <div style={{ marginLeft: "30px" }}>
            <BackButton />
          </div>
        </Stack>
        <Container sx={{ paddingY: 2 }}>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              padding: 2,
              boxShadow: 3,
              backgroundColor: "white",
              gridTemplateColumns: { xs: "1fr", md: "3fr 1fr" },
              gridTemplateRows: "auto",
              gridTemplateAreas: {
                xs: `
                  "bestChoice"
                  "totalScores"
                  "results"
                  "save"
                `,
                md: `
                  "bestChoice totalScores"
                  "results totalScores"
                  "save totalScores"
                `,
              },
            }}
          >
            <Box
              sx={{
                gridArea: "bestChoice",
                padding: 2,
                borderRadius: 1,
                boxShadow: 3,
                backgroundColor: "#e0f7fa",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Typography variant="h4" gutterBottom>
                Best Choice
              </Typography>
              <Typography variant="h5" gutterBottom>
                {bestChoice}
              </Typography>
              <Box sx={{ width: "100px", height: "100px", marginTop: 2 }}>
                <CircularProgressbar
                  value={convertScoreToOutOfTen(totalScores[bestChoice] || 0)}
                  maxValue={10}
                  text={`${convertScoreToOutOfTen(
                    totalScores[bestChoice] || 0
                  )}/10`}
                  styles={buildStyles({
                    pathColor: `rgba(62, 152, 199, ${
                      (totalScores[bestChoice] || 0) / getTotalMaxValue()
                    })`,
                    textColor: "#0277bd",
                    trailColor: "#d6d6d6",
                  })}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  padding: "5px 10px",
                  backgroundColor: "gold",
                  borderRadius: "0 0 0 10px",
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                  Top Choice
                </Typography>
              </Box>
              {tiebreakerExplanation && (
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {tiebreakerExplanation}
                  </Typography>
                </Box>
              )}
            </Box>
            <Box sx={{ gridArea: "results", padding: 2 }}>
              <Typography variant="h4" gutterBottom>
                Results
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Below are the detailed results for each criterion. Click on each
                section to expand and view the graph for that criterion.
              </Typography>
              {decisionState.criteria.map((criterion, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography variant="h6">{criterion.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                      This graph illustrates the performance of each option
                      based on the "{criterion.name}" criterion.
                    </Typography>
                    <BarChartComponent criterion={criterion.name} />
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
            <Box
              sx={{
                gridArea: "totalScores",
                padding: 2,
                borderRadius: 1,
                boxShadow: 3,
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Total Scores
              </Typography>
              {Object.keys(totalScores).map((option) => (
                <Box
                  key={option}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    {option}:
                  </Typography>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    {convertScoreToOutOfTen(totalScores[option])}/10
                  </Typography>
                  <Box sx={{ width: "50px", height: "50px", marginLeft: 2 }}>
                    <CircularProgressbar
                      value={convertScoreToOutOfTen(totalScores[option])}
                      maxValue={10}
                      text={`${convertScoreToOutOfTen(totalScores[option])}/10`}
                      styles={buildStyles({
                        pathColor: `rgba(62, 152, 199, ${
                          (totalScores[option] || 0) / getTotalMaxValue()
                        })`,
                        textColor: "#0277bd",
                        trailColor: "#d6d6d6",
                      })}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                gridArea: "save",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CustomButton onClick={ViewPreviousDecisions}>
                Save Decision
              </CustomButton>
            </Box>
          </Box>
        </Container>
      </Container>
    </Layout>
  );
};

export default ResultsPage;
