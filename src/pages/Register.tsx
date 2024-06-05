import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import { NavLink, useNavigate } from 'react-router-dom';
import { useBreadcrumbs } from '../contexts/BreadcrumbsProvider';
import BackButton from '../components/BackButton';
import { Stack } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import Fab from "@mui/material/Fab";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { signUp } from '../supabase/auth'; // Import the signUp function
import Layout from '../components/Layout';

function Register({ setAuth }: any) {
    const navigate = useNavigate();
    const { handleNavigation } = useBreadcrumbs();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;

        const displayName = `${firstName}`;
        try {
            await signUp(email, password, displayName);
            setAuth(true);
            navigate('/', { state: { isAuthenticated: true } });
        } catch (error: any) {
            console.error('Sign up error:', error.message);
        }
    };

    return (
      <Layout>
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          {/* Added a background color and flex utilities to center the content */}
          <Stack>
            <Box display="flex" alignItems="center">
              <Fab
                component={RouterLink}
                to="/"
                aria-label="back"
                sx={{ mr: 1 }}
              >
                <ArrowBackIosNewRoundedIcon />
              </Fab>
              <Typography variant="body1">Back to Home Page</Typography>
            </Box>
          </Stack>
          <Container
            component="main"
            maxWidth="xs"
            className="stack-container"
            // Added shadow-lg and other Tailwind CSS classes for styling
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">
                <NavLink
                  to="/"
                  onClick={() => handleNavigation("/", "Home")}
                  style={{ textDecoration: "none", color: "#337357" }}
                >
                  DecisionMaker
                </NavLink>
              </Typography>
              <Typography variant="body1">Sign up</Typography>
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
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </Layout>
    );
}

export default Register;