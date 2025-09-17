import * as React from "react";
import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Avatar,
  MenuItem,
  Menu,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import theme from "../theme/theme";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import { getUser, signOut } from "../supabase/auth";
import { useAuth } from "../contexts/AuthContext";

const navItems = [
  // { label: "DecisionMaker", path: "/" },
  { label: "New Decision", path: "/NewDecision" },
  { label: "Previous Decisions", path: "/PreviousDecision" },
  { label: "About", path: "/aboutUs" },
  { label: "Contact Us", path: "/contactUs" },
];

function Header() { // Main header component
  const { isAuthenticated: auth, userProfile: authUserProfile } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const { handleNavigation, resetBreadcrumbs } = useBreadcrumbs();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const location = useLocation();

  // Remove local storage effects as auth state is now managed by AuthContext

  useEffect(() => {
    const resolveDisplayName = () => {
      if (auth && authUserProfile) {
        const meta: any = authUserProfile.user_metadata ?? {};

        // Try several possible metadata keys
        const fromMeta: string | undefined =
          meta.display_name ||
          meta.displayName ||
          meta.full_name ||
          meta.fullName ||
          (meta.first_name && meta.last_name
            ? `${meta.first_name} ${meta.last_name}`
            : undefined) ||
          (meta.given_name && meta.family_name
            ? `${meta.given_name} ${meta.family_name}`
            : undefined) ||
          meta.nickname ||
          meta.name;

        if (fromMeta && fromMeta.trim().length > 0) {
          setDisplayName(fromMeta.trim());
          return;
        }

        // Fallback to email prefix
        if (authUserProfile.email) {
          const emailPrefix = authUserProfile.email.split("@")[0];
          if (emailPrefix && emailPrefix.trim().length > 0) {
            setDisplayName(emailPrefix.trim());
            return;
          }
        }

        setDisplayName(null);
      } else {
        setDisplayName(null);
      }
    };
    resolveDisplayName();
  }, [auth, authUserProfile]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setDisplayName(null);
    setSnackbarMessage("Logout successful!");
    setSnackbarOpen(true);
    handleClose();
    navigate("/", { state: { isAuthenticated: false } });
  };
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut();
    navigate("/login", { state: { isAuthenticated: false } });
    window.location.reload(); // Refresh the page
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const MAX_NAME_CHARS = 18;

  const getShortName = (name: string | null, small: boolean): string => {
    if (!name) return "User";
    const trimmed = name.trim();
    if (trimmed.length === 0) return "User";

    if (small) {
      const parts = trimmed.split(/\s+/);
      if (parts.length >= 2) {
        return `${parts[0]} ${parts[1].charAt(0).toUpperCase()}.`;
      }
      return parts[0];
    }

    if (trimmed.length > MAX_NAME_CHARS) {
      return `${trimmed.slice(0, MAX_NAME_CHARS - 1)}…`;
    }
    return trimmed;
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ textAlign: "center", my: 2 }}>
        DecisionMaker
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            button
            component={NavLink}
            to={item.path}
            onClick={() => handleNavigation(item.path, item.label)}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        {!auth && (
          <>
            <ListItem button component={NavLink} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={NavLink} to="/register">
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
        {auth && (
          <>
            <ListItem button onClick={handleSignOut}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
            {isSmallScreen && (
              <ListItem>
                <ListItemText primary={`Logged in as ${displayName ?? "User"}`} />
              </ListItem>
            )}
          </>
        )}
      </List>
    </Box>
  );

  const unauthenticated = (
    <Box sx={{ display: "flex", alignItems: "center", padding: "0.5rem" }}>
      <IconButton
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          marginRight: "0.6rem",
        }}
        aria-label="user-icon"
      >
        <PersonIcon />
      </IconButton>
      <Typography variant="body1">
        <NavLink to="/login" style={{ color: "black", textDecoration: "none" }}>
          Login
        </NavLink>{" "}
        |{" "}
        <NavLink
          to="/register"
          style={{ color: "black", textDecoration: "none" }}
        >
          Register
        </NavLink>
      </Typography>
    </Box>
  );

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
      <AppBar
        sx={{
          background: theme.palette.background.default,
          color: theme.palette.primary.main,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              <NavLink
                to="/"
                onClick={() => handleNavigation("/", "Home")}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                DecisionMaker
              </NavLink>
            </Typography>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                justifyContent: "space-around",
                gap: "1.75rem",
              }}
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={() => handleNavigation(item.path, item.label)}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button>{item.label}</Button>
                </NavLink>
              ))}
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {auth ? (
                <>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ borderRadius: "10px" }}>
                      {displayName ? displayName.charAt(0).toUpperCase() : "U"}
                    </Avatar>
                    <Box sx={{ marginLeft: "8px" }} title={displayName ?? "User"}>
                      {getShortName(displayName, isSmallScreen)}
                    </Box>
                    <IconButton
                      aria-controls="user-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                      aria-label="expand more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                    <Menu
                      id="user-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
                    </Menu>
                  </Box>
                  {isSmallScreen && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "0.5rem",
                      }}
                    >
                      <Typography variant="body2" title={displayName ?? "User"}>
                        {`Logged in as ${getShortName(displayName, true)}`}
                      </Typography>
                    </Box>
                  )}
                </>
              ) : (
                unauthenticated
              )}
            </Box>
          </Toolbar>
        </Container>
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{ display: { md: "none" } }}
        >
          {drawer}
        </Drawer>
      </AppBar>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Adjust as per your preference
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
export default Header;
