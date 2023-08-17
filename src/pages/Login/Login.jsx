import React, { useState } from "react";
import NavBar from "../../components/Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Avatar,
  Box,
  Button,
  Container,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { green, red, yellow } from "@mui/material/colors";
import {
  Height,
  LockClockSharp,
  LockOutlined,
  PhoneLockedRounded,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "maroon",
  },
}));

const theme = createTheme({
  status: {
    danger: red[500],
    success: green[800],
  },
});

const defaultTheme = createTheme();

const Login = ({ setLoggedIn, setRole, role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateToComponent = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("https://book-e-sell-node-api.vercel.app/api/user/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          // console.log(response);
          if (response.data.key == "SUCCESS") {
            toast.success("Login Successfull");
            console.log(response.data.result.roleId);
            setRole(response.data.result.roleId);
            console.log("role", role);
            setTimeout(() => {
              if (response.data.result.roleId == 1) {
                setLoggedIn(true);
                navigateToComponent("/manage");
              } else {
                setLoggedIn(true);
                navigateToComponent("/");
              }
            }, 3000);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    } catch (error) {
      toast.error("Some error occured");
      console.log("error");
    }

    console.log(email, password);
  };

  return (
    <div>
      <Container maxWidth="xs" margin="auto" sx={{ minHeight: "69vh" }}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              marginTop: 8,
              width: "30rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "white",
              borderRadius: "50px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8.1px)",
              border: "1px solid #ffd8cc",
              padding: "1rem",
            }}
          >
            <Avatar sx={{ bgcolor: "#d80000" }}>
              <LockOutlined />
            </Avatar>
            <Typography sx={{ fontSize: "1.5rem" }}>Sign In</Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
                maxWidth: "xs",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                margin="normal"
                required
                type="emails"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                sx={{ width: "20rem" }} // Add this line to set the desired width
              />
              <TextField
                margin="normal"
                required
                id="password"
                label="Password "
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                sx={{ width: "20rem" }} // Add this line to set the desired width
              />
              <CustomButton variant="outlined" color="error" sx={{m:"1rem", backgroundColor: "white", "&:hover":{backgroundColor: "red", color: "white",}}} type="submit">
                Submit
              </CustomButton>
            </Box>
          </Box>
        </ThemeProvider>
      </Container>
      <ToastContainer limit={1} position="top-right" autoClose={2000} />
    </div>
  );
};

export default Login;
