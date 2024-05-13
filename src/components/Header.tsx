import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button, Container } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import theme from '../theme/theme';
import Search from './Search';
import User from './Users'
import { Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {MoreVert as MoreVertIcon} from '@mui/icons-material'
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";


const pages = [''];
// Inside the Toolbar component
{pages.map((page) => (
  <NavLink key={page} to={`/${page.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <Button>{page}</Button>
  </NavLink>
))}



const searchBoxStyles = {
  backgroundColor: '#C3C3C3',
  borderRadius: '9px',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  width: '350px',
  marginTop: '10px',
  marginLeft: '30px'
};

// Dummy user data
const user = {
  name: 'Mikä',
  avatar: 'Ölga'
}

export default function Header(){
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const changeAuth = () =>{
      setAuth(!auth);
      if(!auth){
        handleClose()
      }
  }
    
    const unauthenticated = [
      <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        padding: '0.5rem',
        borderRadius: '5px',
      }}
    >
      <IconButton
        sx={{
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          marginRight: '0.6rem',
        }}
        aria-label="user-icon"
      >
        <PersonIcon />
      </IconButton>
      <Typography variant="body1">
        <a href="#" onClick={changeAuth} style={{ color: 'black', textDecoration: 'none' }}>
          Login
        </a>{' '}
        |{' '}
        <a href="#" style={{ color: 'black', textDecoration: 'none' }}>
          Register
        </a>
      </Typography>
    </Box>
    ]

  

    const authenticated = [
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center', 
        padding: '0.5rem',
        borderRadius: '5px',
        }}>
      <Avatar src={user.avatar} alt={user.name}  sx={{borderRadius: '10px'}}/>
      <Box sx={{ marginLeft: '8px' }}>{user.name}</Box>
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={changeAuth}>Log Out</MenuItem>
      </Menu>
    </Box>
    ]

    return (
        <AppBar
      
        sx={{
          background: theme.palette.background.default,
          color: theme.palette.primary.main
      }}
      >
            <Container maxWidth= 'xl'>
            <Toolbar sx={{
                 display: 'flex',
                 justifyContent: 'space-around',
                 gap: '2.5rem'
                
                 }}>
                 
                <Typography 
                    variant='h6'
                    sx = {{
                      
                    }}
                >
                   <NavLink
                to="/"
                // style={({ isActive }) => {
                // return isActive ? { color: "plum" } : {};
                // }}
                >
                  DecisionMaker
                  </NavLink>
                </Typography>


                <Typography 
                    variant='button'
                    sx = {{
                      
                    }}>
               <NavLink to="/NewDecision" style={{ textDecoration: 'none', color: 'inherit' }}>
  <Button>New Decision</Button>
</NavLink>

<NavLink to="/PreviousDecision" style={{ textDecoration: 'none', color: 'inherit' }}>
  <Button>Previous Decisions</Button>
</NavLink>

<NavLink to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
  <Button>Help</Button>
</NavLink>

<NavLink to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
  <Button>About</Button>
</NavLink>

                </Typography>

           <Box sx={{ flexGrow: 1, gap: '1.75rem' ,display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ 

                }}
              >
                {page}
              </Button>
            ))}
          </Box>

      
          <Box sx={searchBoxStyles}>
        <IconButton type="submit" aria-label="search">
          <MoreVertIcon />
        </IconButton>
        <InputBase
          placeholder="Search anything"
          sx={{ flex: 1, borderRadius: '4px' }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>
      <Box>
            {auth ? authenticated : unauthenticated}
      </Box>
      
            </Toolbar>

            </Container>
        </AppBar>
    );

}