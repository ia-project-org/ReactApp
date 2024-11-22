import React from "react";
import { Container, 
    Paper, 
    Avatar,
    Typography, 
    Box, 
    TextField, 
    FormControlLabel, 
    Button,
    Checkbox} from "@mui/material";
import "../styles/login.css";


function Login() {
    const handleSubmit = () => console.log("login");
    return (
        <Container maxWidth="xs"
            sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            justifyContent: "space-between",}}
        >
            <Paper elevation={5} sx={{marginTop:10 , padding: 4, px: 5}}>
            <Avatar
                sx={{
                    mx: "auto",
                    bgcolor: "secondary.main",
                    textAlign: "center",
                    mb: 3,
                    width: 70,
                    height: 70,
                }}
                >
                {/* ghn7tu hna logo later */}
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
            Welcome back to Logoipsum
            </Typography>
            <Typography component="h1" variant="caption" sx={{ textAlign: "center", mb: 5}}>
            Enter your username and password to continue
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                required
                id="outlined-required"
                label="Email address"
                placeholder="Enter your email address..."
                fullWidth
                slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                sx={{mb:3}}
                />
            <TextField
                required
                id="outlined-required"
                label="Password"
                placeholder="Enter your password..."
                fullWidth
                slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  type="password"
                />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{ justifyContent: "flex-start", width: "100%", ml: 0, typography: "body2", mb:5 }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                Sign In
            </Button>
            </Box>
            </Paper>
        <Box
            component="footer"
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                width: "100%",
                mt: "auto",
            }}
            >
                <Typography variant="caption" color="text.secondary">
                    © Logoipsum Inc. All rights reserved
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ cursor: "pointer" }}
                    onClick={() => console.log("contact support click isnt handled yet :/")}
                >
                    Contact Support
                </Typography>
            </Box>
        </Container>
    );
    };

export default Login;
