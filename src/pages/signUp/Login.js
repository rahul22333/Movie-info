import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginPage() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const signUpStore = JSON.parse(localStorage.getItem("signUpInfo"));

  const handleSubmit = (event) => {
    event.preventDefault();
    const SignUpInfo = signUpStore ? signUpStore.filter((item) => {
      return item.name === userName && item.password === password
    }) : null
    const info = signUpStore ? SignUpInfo.toString() : null
    if (userName === "" || password === "") {
      alert("please fill data")
      setUsername("")
      setPassword("")
    } else if (!info) {
      alert("invalid data")
      setUsername("");
      setPassword("")
    }
    else {
      const name = userName
      const pass = password
      const loginInfo = [{ name: name, password: pass }]
      localStorage.setItem("loginInfo", JSON.stringify(loginInfo))
      navigate("/home")
    }
  };
  useEffect(() => {
    if (verified) {
      localStorage.setItem("gmailinfo", JSON.stringify(verified))
      navigate('/home')
    }
  }, [verified])

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
          <h1> Login </h1>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="user name"
                  name="user name"
                  autoFocus
                  value={userName}
                  onChange={(e) => { setUsername(e.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>

            <Button
              onClick={() => { navigate("/userinfo") }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              signUp
            </Button>
            <GoogleOAuthProvider clientId="845526233994-5vq7kk80f050a7sco1ubesvlla6nclm9.apps.googleusercontent.com">
              <GoogleLogin
                theme='filled_blue'
                shape='circle'
                logo_alignment="center"
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  const decoded = jwt_decode(credentialResponse.credential);
                  console.log(decoded)
                  setVerified(decoded.email_verified)

                }}
                onError={() => {
                  alert('Login Failed');
                }}
              />
            </GoogleOAuthProvider>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
