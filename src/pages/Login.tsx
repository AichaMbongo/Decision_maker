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
import Layout from '../components/Layout';
import { Link as RouterLink } from "react-router-dom";
import Fab from "@mui/material/Fab";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { signIn, AuthError } from '../supabase/auth'; // Import the signIn function and AuthError

function Login({ setAuth }: any) {
    const navigate = useNavigate();
    const { handleNavigation } = useBreadcrumbs();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [loginError, setLoginError] = React.useState('');

    const validateForm = () => {
        let isValid = true;

        if (!email || !email.includes('@')) {
            setEmailError('Invalid email address');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password || password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await signIn(email, password);
            setAuth(true);
            navigate('/', { state: { isAuthenticated: true } });
        } catch (error: any) {
            if (error instanceof AuthError && error.code === 'invalid_credentials') {
               // setLoginError('Incorrect email or password');
            } else {
                setLoginError('Incorrect email or password');
                //console.log(error.message)
                //console.error('Sign in error:', error.message);
            }
        }
    };

    return (
      <Layout>
        <Stack>
          <div style={{ marginLeft: "30px" }}>
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
          </div>
        </Stack>
        <Container component="main" maxWidth="xs" className="stack-container">
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
            <Typography variant="body1">Sign in</Typography>
            <Typography variant="body2" color="error">
              {loginError}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                error={!!emailError}
                helperText={emailError}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                error={!!passwordError}
                helperText={passwordError}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Layout>
    );
}

export default Login;
