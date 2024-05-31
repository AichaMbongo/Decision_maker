import React, { useState } from "react";
import Header from "../components/Header";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme";
import BackButton from "../components/BackButton";
import { Stack, Typography, Button } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { NavLink } from "react-router-dom";
import CustomButton from "../components/Button";
import Layout from "../components/Layout";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import { DecisionStateContext } from "../contexts/DecisionStateContext";
import { useContext } from "react";

// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//     event.preventDefault();
//     console.info('You clicked a breadcrumb.');
// }

const handleClick = () => {
  console.log("Button is Clicked");
};

const NewOption = () => {
  const { handleNavigation } = useBreadcrumbs();
  const addOtherNewOption = () => {
    handleNavigation("/OtherNewOption", "Other New Option");
  };
  const [option, setOption] = useState<string>("");
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);

  const options = decisionState.options;
  const handleClick = () => {
    console.log("option", option);
    console.log(decisionState);
    const updatedOptions = [...decisionState.options, option];
    setDecisionState({ ...decisionState, options: updatedOptions });
    console.log("Updated Options", decisionState);
    handleNavigation("/OtherNewOption", "Other New Option");

    //
  };

  return (
    <Layout>
      <div style={{ marginLeft: "30px" }}>
        {" "}
        <BackButton />
      </div>
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Stack className="stack-container">
          <div>
            <Typography variant="h4" align="center">
              Enter Your Option
            </Typography>
          </div>

          <Stack
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            style={{ marginBottom: "154px", padding: 3, marginTop: "10px" }}
          >
            <FormatListBulletedIcon
              style={{ fontSize: "56px", padding: "2" }}
            />

            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "50ch" },
              }}
            >
              <TextField
                id="filled-basic"
                label="ie. BMW, Mercedes"
                name="option"
                value={option}
                onChange={(e) => setOption(e.target.value)}
                variant="filled"
              />
            </Box>

            <Button onClick={handleClick}>PROCEED</Button>

            {/* <NavLink
              to="/otherNewOption"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CustomButton onClick={addOtherNewOption}>PROCEED</CustomButton>
            </NavLink> */}
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default NewOption;
