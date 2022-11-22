import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const user_me = axios.create({
  baseURL: "http://127.0.0.1:8000/api/users/me/",
  headers: {
    Authorization: "Token " + localStorage.getItem("auth_token"),
  },
});

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    username: "",
    first_name: "",
    last_name: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let username = data.get('email') === "" ? user.username : data.get('email');
    let firstName = data.get('firstName') === "" ? user.firstName : data.get('firstName');
    let lastName = data.get('lastName') === "" ? user.lastName : data.get('lastName');
    let password = data.get('password');

    updateUser(username, firstName, lastName, password);
    navigate("/feed");
  };

  const updateUser = (username, firstName, lastName, password) => {
    const token = localStorage.getItem("auth_token");
    user_me.put("", {
      username: username,
      first_name: firstName,
      last_name: lastName,
      password: password,
      }).then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = () => {
    const token = localStorage.getItem("auth_token");
    user_me.get()
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
            <Typography component="h1" variant="h5">
                Edit Your Profile
            </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Avatar
                    src="./assets/img/mike.jpg"
                    sx={{ width: 120, height: 120 }}
                    style= {{alignSelf: 'center'}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label={ user.first_name }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="lastName"
                  label={ user.last_name }
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label={ user.username }
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Type to change password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}