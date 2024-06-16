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
} from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import theme from "../theme/theme";
import { useBreadcrumbs } from "../contexts/BreadcrumbsProvider";
import { getUser, signOut } from "../supabase/auth";
import { supabase } from "../supabase/supabaseClient";

const navItems = [
  { label: "DecisionMaker", path: "/" },
  { label: "New Decision", path: "/NewDecision" },
  { label: "Previous Decisions", path: "/PreviousDecision" },
  { label: "About", path: "/aboutUs" },
  { label: "Contact Us", path: "/contactUs" },
];

interface HeaderProps {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ auth, setAuth }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userProfile, setUserProfile] = useState<{
    displayName: string;
  } | null>(null);
  const { handleNavigation, resetBreadcrumbs } = useBreadcrumbs();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth === "true") {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [setAuth]);

  useEffect(() => {
    localStorage.setItem("auth", auth.toString());
  }, [auth]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await getUser();
        if (error) {
          console.error("Error fetching user:", error.message);
          return;
        }
        if (data && data.user && data.user.id) {
          const userId = data.user.id;

          const { data: userProfileData, error: profileError } = await supabase
            .from("user_profiles")
            .select("display_name")
            .eq("id", userId)
            .single();

          if (profileError) {
            console.error("Error fetching user profile:", profileError.message);
            return;
          }

          if (userProfileData) {
            setUserProfile({ displayName: userProfileData.display_name });
            setAuth(true);
          } else {
            setAuth(false);
          }
        } else {
          setAuth(false);
        }
      } catch (error: any) {
        console.error("Error fetching user:", error.message);
        setAuth(false);
      }
    };
    fetchUser();
  }, [setAuth]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signOut();
    setAuth(false);
    setUserProfile(null);
    handleClose();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        DecisionMaker
      </Typography>
      <List>
        {navItems.slice(1).map((item) => (
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

  const authenticated = (
    <Box sx={{ display: "flex", alignItems: "center", padding: "0.5rem" }}>
      <Avatar sx={{ borderRadius: "10px" }}>
        {userProfile ? userProfile.displayName.charAt(0) : "U"}
      </Avatar>
      <Box sx={{ marginLeft: "8px" }}>
        {userProfile ? userProfile.displayName : "User"}
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
  );

  return (
    <AppBar
      sx={{
        background: theme.palette.background.default,
        color: theme.palette.primary.main,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
            {navItems.slice(1).map((item) => (
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
            {auth ? authenticated : unauthenticated}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { md: "none" } }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Header;
