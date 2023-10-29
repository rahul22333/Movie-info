import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/login">
        MovieApp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
  });
  const navigate = useNavigate()
  const handleUserInfo = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserInfo((pev) => ({ ...pev, [name]: value }))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (userInfo.firstName === "" || userInfo.lastName === "") {
      alert("Please enter your name")
    } else if (userInfo.birthDate === "") {
      alert("Please enter your date of birth")
    } else if (userInfo.email === "") {
      alert('Plear enter your email ')
    } else {
      setUserInfo({ firstName: "", lastName: "", birthDate: "", email: "" })
      navigate("/signup")
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={userInfo.firstName}
                  onChange={handleUserInfo}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={userInfo.lastName}
                  onChange={handleUserInfo}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="birthDate"
                  label="Date of birth"
                  id="password"
                  autoComplete="new-password"
                  value={userInfo.birthDate}
                  onChange={handleUserInfo}
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
                  value={userInfo.email}
                  onChange={handleUserInfo}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Continue
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
