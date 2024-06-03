import BackButton from "../components/BackButton";
import { Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import CustomButton from "../components/Button";
import { NavLink } from "react-router-dom";
import Layout from "../components/Layout";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import { DecisionStateContext } from "../contexts/DecisionStateContext";
import DecisionState, {
  Criterion,
} from "../components/interfaces/DecisionState";
import { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//     event.preventDefault();
//     console.info('You clicked a breadcrumb.');
// }
interface Comparison {
  [option: string]: {
    [otherOption: string]: number;
  };
}
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

const OtherNewOption = () => {
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);

  console.log(decisionState);
  const { handleNavigation } = useBreadcrumbs();

  const options = decisionState.options;

  const EvaluateOptions = () => {
    const initializeComparisons = (
      criteria: Criterion[],
      options: string[]
    ) => {
      return criteria.map((criterion) => {
        const comparisons: Comparison = {};
        options.forEach((option, i) => {
          comparisons[option] = {};
          options.slice(i + 1).forEach((nextOption) => {
            comparisons[option][nextOption] = 0; // Default comparison value
          });
        });
        return { ...criterion, comparisons };
      });
    };

    const updatedCriteria = initializeComparisons(
      decisionState.criteria,
      decisionState.options
    );
    setDecisionState({ ...decisionState, criteria: updatedCriteria });

    handleNavigation("/EvaluateOptionsPage", "Evaluate Options");
  };

  const updateDecisionState = (updatedProperties: Partial<DecisionState>) => {
    setDecisionState((prevState) => ({
      ...prevState,
      ...updatedProperties,
    }));
  };

  const handleDelete = (id: number) => {
    console.log(id);
    console.log("Criteria:", options);
    options.splice(id, 1);
    console.log("Updated criteria: ", options);
    updateDecisionState({ options: options });
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
          <Typography variant="h4" align="center">
            Do you want to Add Another Option?
          </Typography>
          <PsychologyAltIcon style={{ fontSize: "56px", padding: "2" }} />
          {/* <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="filled-basic" label="Type in something...." variant="filled" />
                </Box> */}

          <Stack
            sx={{ p: 1 }}
            gap={6}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{ marginBottom: "30px" }}
          >
            <NavLink
              to="/newOption"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CustomButton onClick={handleClick}>Yes</CustomButton>
            </NavLink>

            <NavLink
              to="/EvaluateOptionsPage"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CustomButton onClick={EvaluateOptions}>No</CustomButton>
            </NavLink>
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{ p: 1 }} gap={4} direction="column">
        <Grid
          container
          padding={4}
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {decisionState.options.map((option, index) => (
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
                    <Typography variant="body1">{option}</Typography>
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

export default OtherNewOption;
