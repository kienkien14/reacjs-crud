import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPass } from "../../service/user.service";

function ForgotPassword() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    let navigate = useNavigate();

    const handleForgotPass = async (data) => {
        try {
            const { username } = data;
            await forgotPass(username);
            toast("Reset password ok!")
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleForgotPass)}>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg"
                        style={{ width: 60, height: 60 }}
                    />
                    <Typography component="h1" variant="h5">
                        Forgot password
                    </Typography>
                    <Box component="form" sx={{ mt: 2, mb: 2 }}>
                        <TextField label="Username or email" variant="standard"
                            {...register("username", { required: true })}
                            error={errors.username}
                            helperText={errors.username && "This field is required"}
                        />
                    </Box>
                    <Box >
                        <Button variant="contained" type="submit" sx={{ pr: 15, pl: 15 }}>
                            Reset password
                        </Button>
                    </Box>
                    <Grid container sx={{ mt: 2 }}>
                        <Grid item xs>
                            <Link to="/login" variant="body2">
                                Login
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>Copyright © ChatGPT</Typography>
            </Container>
        </form>

    )
}

export default ForgotPassword;