import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Home from "@mui/icons-material/Home";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

export default function NavBar({ role, isloggedIn, setLoggedIn }) {
  console.log("from navbar :" + role);
  return (
    <AppBar position="static" sx={{ backgroundColor: "#D40000" }}>
      <Toolbar>
        <NavLink to="/">
          <Home sx={{ margin: "1rem", color: "white" }} />
        </NavLink>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TatvaSoft Internship Project
        </Typography>
        {/* <SearchBar variant="outlined" /> */}
        {isloggedIn && (role == 2 || role == 1) ? (
          <>
            <NavLink to="/">
              <Button variant="outlined" color="error" sx={{m:"1rem", backgroundColor: "white", "&:hover":{backgroundColor: "red", color: "white",}}}>
                Home
              </Button>
            </NavLink>
            {role == 1 ? (
              <>
                <NavLink to="/manage">
                  <Button variant="outlined" color="error" sx={{m:"1rem", backgroundColor: "white", "&:hover":{backgroundColor: "red", color: "white",}}}>
                    Users
                  </Button>
                </NavLink>
                <NavLink to="/adminmanagebooks">
                  <Button
                   variant="outlined" color="error" sx={{m:"1rem", backgroundColor: "white", "&:hover":{backgroundColor: "red", color: "white",}}}
                  >
                    Manage Books
                  </Button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/managebooks">
                  <Button
                   variant="outlined" color="error" sx={{m:"1rem", backgroundColor: "white", "&:hover":{backgroundColor: "red", color: "white",}}}
                  >
                    Manage Books
                  </Button>
                </NavLink>
              </>
            )}
             <NavLink to="/cart">
              <Button 
                variant="outlined" color="error" sx={{m:"1rem", backgroundColor: "white", "&:hover":{backgroundColor: "red", color: "white",}}}
              >
                Cart
              </Button>
            </NavLink>

            <NavLink to="/">
              <Button
                variant="outlined" color="error" sx={{backgroundColor: "white", "&:hover":{backgroundColor: "red", color: "white",}}}
                onClick={() => {
                  setLoggedIn(false);
                }}
              >
                Logout
              </Button>
            </NavLink>{" "}
          </>
        ) : (
          <>
            <NavLink to="/register">
              <Button variant="outlined" color="error" sx={{backgroundColor: "white", "&:hover":{backgroundColor: "red", color: "white",}}} >
                Register
              </Button>
            </NavLink>
            <NavLink to="/login">
              <Button variant="outlined" color="error" sx={{ m: "1rem", backgroundColor: "white", "&:hover":{backgroundColor: "red", color: "white"} }}>
                Login
              </Button>
            </NavLink>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
