import { Key } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Alert, Avatar, Box, Checkbox, Container, CssBaseline, FormControlLabel, Grid, InputAdornment, Link, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { loginAPI } from "../../service/login.service";
import { meAPI } from "../../service/user.service";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let [isAuthenticated, setAuthenticated] = useState(true);

  let { setAuth, setUser } = useContext(AuthContext);

  let navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const { username, password } = data;
      let body = await loginAPI(username, password);
      setAuthenticated(true);
      setAuth(true); //update context
      //luu vao localStorage de dung sau nay
      localStorage.setItem("token", body.data);

      // Goi API me
      const user = await meAPI();
      console.log(user);
      setUser(user)
      // end
      navigate("/"); //tra ve trang home
    } catch (error) {
      console.log(error);
      setAuthenticated(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
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
          <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg"
            style={{ width: 60, height: 60 }}
          />
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              autoComplete="email"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}

              {...register("username", { required: true })}
              error={errors.username}
              helperText={errors.username && "This field is required"}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Key />
                  </InputAdornment>
                ),
              }}
              {...register("password", { required: true, minLength: 6 })}
              error={errors.password}
              helperText={errors.password && "This field is required min 6"}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          </Box>
          {!isAuthenticated && (
            <Alert severity="error" sx={{ m: 1, }}>Username & password are not connect</Alert>
          )}
          <Box>
            <Button variant="contained" type="submit" sx={{ pr: 22, pl: 22 }}>
              Login
            </Button>
          </Box>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs>
              <Link href="forgot-password" variant="body2">
                Forgot password?
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
    </form>
  );
}

export default Login;
