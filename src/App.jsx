import {useEffect, Fragment, useState} from 'react';
import {Route, Routes, Navigate, NavLink} from 'react-router-dom';

///Component Imports
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import UserSignup from './components/SignupForms/UserSignup';
import UserPage from './pages/UserPage';
import CompanySignupStepper from './components/SignupForms/CompanySignupStepper';
import Signin from './components/Signin';
import SripeSuccess from './components/StripeSuccess';
import StripeCancel from './components/StripeCancel';
import StripePayment from './components/StripePayment';
import ProfileManager from './components/ProfileManager';
import AdminPage from './pages/AdminPage';
import CorpNav from './components/Navbar/CorpNav';
import LandingPage from './pages/LandingPage';
import OauthSuccess from './components/OauthSuccess';
import CorpPage from './pages/CorpPage';
import SkillsModal from './components/UserComponents/SkillsModal';
import AddRoleForm from './components/FormComponents/AddRoleForm';

//Context Imports (may need to set the theme here if we want light/dark mode setup)
import {useUser} from './hooks/useUser';
//MUI Stuff
//Create the theme and apply it around the whole app
import {createTheme, CssBaseline, ThemeProvider, responsiveFontSizes} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

let userTheme = createTheme({
  palette: {
    primary: {
      main: '#2979FF',
    },
    secondary: {
      main: '#0def3e',
    },
    footer: {
      main: '#64B5F6',
      text: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 16,
          fonrWeight: 700,
          '&:hover': {
            backgroundColor: '#64B5F6',
            color: 'white',
          },
          margin: '2px',
        },
      },
    },
  },
});
userTheme = responsiveFontSizes(userTheme);

function App() {
  const {user, checkLocalSession} = useUser();

  useEffect(() => {
    console.log('checking local user creds');
    checkLocalSession();
  }, []);

  if (user.type === 'user') {
    //Talent signedin routes
    return (
      <ThemeProvider theme={userTheme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Fragment>
            <NavBar />
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<LandingPage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/profile" element={<ProfileManager />} />
              <Route path="oauth-success" element={<OauthSuccess />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </Fragment>
        </LocalizationProvider>
      </ThemeProvider>
    );
  } else if (user.type === 'corp' && user.role === 'admin') {
    //Corp Admin Signed In Routes
    return (
      <ThemeProvider theme={userTheme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Fragment>
            <CorpNav />
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<LandingPage />} />
              <Route path="/corp" element={<CorpPage />} />
              <Route path="/new-role" element={<AddRoleForm />} />
              <Route path="/profile" element={<ProfileManager />} />
              <Route path="oauth-success" element={<OauthSuccess />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </Fragment>
        </LocalizationProvider>
      </ThemeProvider>
    );
  } else {
    // These are the default logged out routes
    return (
      <ThemeProvider theme={userTheme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Fragment>
            <NavBar />
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<LandingPage />} />
              <Route path="/newnav" element={<CorpNav />} />
              <Route path="signup" element={<UserSignup />} />
              <Route path="company-signup" element={<CompanySignupStepper />} />
              <Route path="signin" element={<Signin />} />
              <Route path="oauth-success" element={<OauthSuccess />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/add-skill" element={<SkillsModal />} />
            </Routes>
            <Footer />
          </Fragment>
        </LocalizationProvider>
      </ThemeProvider>
    );
  }
}

export default App;
