import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function AuthScreen() {
  const [formData, setFormData] = useState({});
  const [showLogin, setShowLogin] = useState(true);
  const authForm = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formdata:", formData);
  };

  return (
    <Box
      ref={authForm}
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Card variant="outlined" component={Paper} sx={{ padding: "10px" }}>
        <Stack direction="column" spacing={2} sx={{ width: "400px" }}>
          <Typography variant="h5">
            Please {showLogin ? "Login" : "Sign Up"}
          </Typography>
          {!showLogin && (
            <>
              <TextField
                name="firstName"
                label="First Name"
                variant="standard"
                onChange={handleChange}
              />
              <TextField
                name="lastName"
                label="Last Name"
                variant="standard"
                onChange={handleChange}
              />
            </>
          )}
          <TextField
            type="email"
            name="email"
            label="email"
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            type="password"
            name="password"
            label="password"
            variant="standard"
            onChange={handleChange}
          />
          <Typography
            sx={{ textAlign: "center" }}
            variant="subtitle1"
            onClick={() => {
              setShowLogin((preValue) => !preValue);
              setFormData({});
              authForm.current.reset();
            }}
          >
            {showLogin ? "Signup?" : "Login?"}
          </Typography>
          <Button variant="outlined" type="submit ">
            {showLogin ? "Login" : "Submit"}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

export default AuthScreen;
