import React, { useState, useContext } from "react";
import BackButton from "../components/BackButton";
import {
  Stack,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Paper,
  Box,
  TextField,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import { DecisionStateContext } from "../contexts/DecisionStateContext";
import Layout from "../components/Layout";

const NewOption = () => {
  const { handleNavigation } = useBreadcrumbs();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [option, setOption] = useState<string>("");
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);

  const handleClick = () => {
    console.log("option", option);
    console.log(decisionState);
    const updatedOptions = [...decisionState.options, option];
    setDecisionState({ ...decisionState, options: updatedOptions });
    console.log("Updated Options", decisionState);
    handleNavigation("/OtherNewOption", "Other New Option");
  };

  return (
    <Layout>
      <Stack sx={{ margin: isMobile ? "0" : "0 30px" }}>
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
            mx: 2,
          }}
        >
          <Typography variant="h4" align="center">
            Enter Your Option
          </Typography>
          <Stack alignItems="center" sx={{ mt: 2 }}>
            <FormatListBulletedIcon
              style={{ fontSize: "56px", padding: "2" }}
            />
          </Stack>
          <Box
            sx={{
              width: "100%",
              "& > :not(style)": { m: 1 },
              mt: 2,
              mb: 2,
            }}
          >
            <TextField
              id="filled-basic"
              label="ie. BMW, Mercedes"
              name="option"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              variant="filled"
              fullWidth
            />
          </Box>
          <Stack direction="row" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleClick}>
              PROCEED
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Layout>
  );
};

export default NewOption;
