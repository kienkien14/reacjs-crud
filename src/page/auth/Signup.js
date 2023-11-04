import { Key } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Avatar, Box, Container, CssBaseline, Grid, InputAdornment, Link, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { signupAPI } from "../../service/signup.service";

function Signup() {
  let navigate = useNavigate();
  //User
  let [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  let handleChangeText = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    await signupAPI(user);
    toast("Tao thanh cong!")
    navigate("/");
  };

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg"
          style={{ width: 60, height: 60 }}
        />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Name"
            name="name"
            onChange={handleChangeText}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            onChange={handleChangeText}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="UserName"
            name="username"
            onChange={handleChangeText}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            onChange={handleChangeText}
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box>
          <Button onClick={handleSignup} variant="contained" type="submit" sx={{ pr: 22, pl: 22 }}>
            Signup
          </Button>
        </Box>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs>
            <Link href="login" variant="body2">
              Login
            </Link>
          </Grid>
          <Grid item>
            <Link href="signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>Copyright © ChatGPT</Typography>
    </Container>

  );
}

export default Signup;
