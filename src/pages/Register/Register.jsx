import React, { useEffect, useState } from "react";
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
import { green, purple, red } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import {
  AppRegistration,
  Height,
  LockClockSharp,
  LockOutlined,
  PhoneLockedRounded,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Custombutton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.status.success,
  },
}));

const theme = createTheme({
  status: {
    danger: red[500],
    success: purple[800],
  },
});

const defaultTheme = createTheme();

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [roleId, setRoleId] = useState("");
  const navigateToComponent = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`Username : ${username} \nEmail : ${email} \nPassword : ${password}`);
    axios
      .post("https://book-e-sell-node-api.vercel.app/api/user", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        roleId: roleId,
        password: password,
      })
      .then((response) => {
        // console.log(data);
        try {
          if (response.data.key == "SUCCESS") {
            toast.success("User Created Successfully!");
            setTimeout(() => {
              navigateToComponent("/login");
            }, 3000);
          }
        } catch (error) {
          toast.error("User Already Exists, please Login!");
        }
        // console.log(response.data.key);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        toast.error(err.response.data.error);
      });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    validatePasswordsMatch(password, event.target.value);
  };

  const validatePasswordsMatch = (password, confirmPassword) => {
    setPasswordsMatch(password === confirmPassword);
    console.log("p :" + password + "cp : " + confirmPassword);
  };

  useEffect(() => {
    const validatePasswordsMatch = (password, confirmPassword) => {
      setPasswordsMatch(password === confirmPassword);
    };
  }, [password, confirmPassword]);

  return (
    <div>
      {/* <NavBar /> */}
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
              padding: "1rem",
              background: "white",
              borderRadius: "50px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8.1px)",
              border: "1px solid #ffd8cc",
            }}
          >
            <Avatar sx={{ bgcolor: "#d80000" }}>
              <AppRegistration />
            </Avatar>
            <Typography sx={{ fontSize: "1.5rem" }}>Register</Typography>
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  maxWidth: "20rem",
                }}
              >
                <TextField
                  margin="normal"
                  required
                  id="Firstname"
                  label="Firstname"
                  name="Firstname"
                  autoComplete="Firstname"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  autoFocus
                  sx={{ width: "20rem", margin: "0 .4rem .2rem 0" }} // Add this line to set the desired width
                />
                <TextField
                  margin="normal"
                  required
                  id="Lastname"
                  label="Lastname"
                  name="Lastname"
                  autoComplete="Lastname"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  autoFocus
                  sx={{ width: "20rem", margin: "0 0 .2rem .4rem" }} // Add this line to set the desired width
                />
              </Box>

              <TextField
                margin="normal"
                required
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                sx={{ width: "20rem", margin: ".4rem auto" }} // Add this line to set the desired width
              />
              <FormControl>
                <InputLabel id="demo-select-small-label">Category</InputLabel>
                <Select
                  // labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={roleId}
                  label="Role"
                  sx={{ width: "20rem", margin: ".4rem .2rem" }} // Add this line to set the desired width
                  onChange={(e) => {
                    setRoleId(e.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={2}>Seller</MenuItem>
                  <MenuItem value={3}>Buyer</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePasswordsMatch(e.target.value, confirmPassword);
                }}
                sx={{ width: "20rem", margin: ".4rem auto" }} // Add this line to set the desired width
              />
              <TextField
                margin="normal"
                required
                id="confirmPassword"
                label=" Confirm Password "
                name="confirm password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validatePasswordsMatch(e.target.value, password);
                }}
                error={!passwordsMatch}
                helperText={!passwordsMatch && "Passwords do not match"}
                sx={{ width: "20rem", margin: ".4rem auto" }} // Add this line to set the desired width
              />
              <Custombutton
                type="submit"
                variant="outlined" color="error" sx={{m:"1rem", backgroundColor: "white", "&:hover":{backgroundColor: "red", color: "white",}}}>
                Register
              </Custombutton>
            </Box>
          </Box>
        </ThemeProvider>
        <ToastContainer limit={1} position="top-right" autoClose={2000} />
      </Container>
    </div>
  );
};

export default Register;
