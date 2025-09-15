import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme";
import { NavLink, useNavigate } from "react-router-dom";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";

import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAuth } from "../contexts/AuthContext";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface RegisterProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

function Register({ setAuth }: RegisterProps) {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { handleNavigation } = useBreadcrumbs();
  const [registrationComplete, setRegistrationComplete] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [registeredEmail, setRegisteredEmail] = React.useState("");

  const handleCloseSnackbar = () => {
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    const displayName = `${firstName}`;
    try {
      // Register the user
      const result = await signUp(email, password, displayName);
      
      // Store email and show success state
      setRegisteredEmail(email);
      setRegistrationComplete(true);
      
      // If we have a session, update auth state
      if (result.session) {
        setAuth(true);
      }
    } catch (error: any) {
      console.error("Registration error details:", {
        error,
        message: error.message,
        name: error.name,
        code: error.code,
        details: error.details,
        stack: error.stack
      });
      setErrorMessage(
        error.message || error.details?.message || "Registration failed. Please try again."
      );
    }
  };

  if (registrationComplete) {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}
            >
              <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
              <Typography variant="h5" component="h1">
                Registration Successful!
              </Typography>
              <Typography align="center" color="text.secondary">
                We've sent a confirmation email to:
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {registeredEmail}
              </Typography>
              <Typography align="center" color="text.secondary">
                Please check your inbox and click the verification link to activate your account.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{ mt: 2 }}
              >
                Go to Login
              </Button>
            </Paper>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <Link href="/" style={{ textDecoration: "none" }}>
                <IconButton color="secondary">
                  <ArrowBackIosIcon />
                </IconButton>
              </Link>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6">
                <NavLink
                  to="/"
                  onClick={() => handleNavigation("/", "Home")}
                  style={{ textDecoration: "none", color: "#337357" }}
                >
                  DecisionMaker
                </NavLink>
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body1">Create an Account</Typography>
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Click here to Log in
            </Link>
          </Grid>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create an Account
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
          {errorMessage && (
            <Snackbar
              open={!!errorMessage}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              sx={{ position: "fixed" }}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity="error"
              >
                {errorMessage}
              </Alert>
            </Snackbar>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
