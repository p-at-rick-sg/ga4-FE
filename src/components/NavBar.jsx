import {Fragment, useState} from 'react';
import {NavLink, Link, useNavigate} from 'react-router-dom';

//MUI Imports
import {AppBar, Box, Button, Toolbar, Typography, IconButton, CssBaseline} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//context imports
import {useUser} from '../hooks/useUser';

const NavBar = () => {
  const {pageTitle, logout, user} = useUser();

  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleProfile = () => {
    if (profileOpen) {
      setProfileOpen(!profileOpen);
      if (user.role === 'contributor') {
        navigate('/member');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else navigate('/');
    } else {
      setProfileOpen(!profileOpen);
      navigate('/profile');
    }
  };

  return (
    <Fragment>
      <CssBaseline>
        <Box sx={{flexgrow: 1}}>
          <AppBar position="static">
            <Toolbar>
              <Link to="/home">
                <img src="../src/assets/mytern-logo.png" alt="mytern"></img>
              </Link>

              <Typography
                variant="h6"
                component="div"
                sx={{display: {xs: 'none', sm: 'inline'}, flexGrow: 1}}></Typography>
              {!user.role && (
                <Button color="inherit" component={NavLink} to="signin">
                  Sign In
                </Button>
              )}
              {user.role && (
                <Button color="inherit" component={NavLink} to="home" onClick={logout}>
                  Logout
                </Button>
              )}
              {user.role === 'contributor' && (
                <Button color="inherit" component={NavLink} to="member">
                  Member Area
                </Button>
              )}
              {user.role === 'admin' && (
                <Button color="inherit" component={NavLink} to="admin/dashboard">
                  Admin Dashboard
                </Button>
              )}

              {!user.role && (
                <Button color="inherit" component={NavLink} to="signup">
                  Sign Up
                </Button>
              )}
              {user.role && (
                <IconButton sx={{m: 1, bgcolor: 'footer.text'}} onClick={handleProfile}>
                  <AccountCircleIcon sx={{color: 'white', fontSize: 'large'}} />
                </IconButton>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </CssBaseline>
    </Fragment>
  );
};

export default NavBar;
