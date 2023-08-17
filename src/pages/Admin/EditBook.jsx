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
import FormControl from "@mui/material/FormControl";

import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { green, purple, red } from "@mui/material/colors";
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

const EditBook = ({ bookId }) => {
  const navigateToComponent = useNavigate();
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bookName, description, price, categoryId, imageUrl);
    axios
      .put("https://book-e-sell-node-api.vercel.app/api/book", {
        id: bookId,
        name: bookName,
        description: description,
        price: price,
        categoryId: categoryId,
        base64image: imageUrl,
      })
      .then((response) => {
        if (response.data.key == "SUCCESS") {
          toast.success("Book Updated !!");
          setTimeout(() => {
            navigateToComponent("/");
          }, 3000);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        console.log(err);
      });
  };
  return (
    <div>
      {/* <NavBar /> */}
      <Container maxWidth="xs" sx={{ minHeight: "69vh" }}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 8,
              width: "30rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              /* From https://css.glass */
              background: "rgba(25, 18, 210, 0.13)",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(8.1px)",
              border: "1px solid rgba(183, 188, 236, 0.43)",
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <AddCircleOutlinedIcon />
            </Avatar>
            <Typography sx={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              Update Book
            </Typography>
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
                id="id"
                label="ID"
                name="id"
                autoComplete="name"
                value={bookId}
                placeholder={`${bookId}`}
                autoFocus
                sx={{ width: "20rem", margin: ".4rem .2rem" }} // Add this line to set the desired width
              />
              <TextField
                margin="normal"
                required
                id="name"
                label="Book Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e) => {
                  setBookName(e.target.value);
                }}
                sx={{ width: "20rem", margin: ".4rem .2rem" }} // Add this line to set the desired width
              />

              <TextField
                margin="normal"
                required
                type="text"
                id="description"
                label="Description "
                name="Description"
                autoComplete="Description"
                multiline // Enable multiline input
                rows={5} // Adjust the number of rows to set the height
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                sx={{
                  width: "20rem",
                  margin: ".4rem auto",
                }} // Add this line to set the desired width
              />
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
                  id="price"
                  label="Price"
                  name="Price"
                  autoComplete="Price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  sx={{ width: "50%", margin: "0 .4rem .2rem 0" }} // Add this line to set the desired width
                />
                {/* <TextField
                  margin="normal"
                  required
                  id="category"
                  label="Category"
                  name="Category"
                  autoComplete="Category"
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                  }}
                  sx={{ width: "20rem", margin: "0 0 .2rem .4rem" }} // Add this line to set the desired width
                /> */}
                {/* <InputLabel id="category">Age</InputLabel> */}

                <FormControl>
                  <InputLabel id="demo-select-small-label">Category</InputLabel>
                  <Select
                    // labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={categoryId}
                    label="Category"
                    sx={{ width: "9.3rem", margin: "0 0 .2rem .4rem" }} // Add this line to set the desired width
                    onChange={(e) => {
                      setCategoryId(e.target.value);
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={2}>2 - Historic Fiction</MenuItem>
                    <MenuItem value={3}>3 - Fantasy</MenuItem>
                    <MenuItem value={4}>4 - Horror</MenuItem>
                    <MenuItem value={5}>5 - Thriller</MenuItem>
                    <MenuItem value={6}>6 - Essayyyy</MenuItem>
                    <MenuItem value={7}>7 - Graphic Novel</MenuItem>
                    <MenuItem value={8}>8 - Comic Book</MenuItem>
                    <MenuItem value={9}>9 - Spirituality</MenuItem>
                    <MenuItem value={10}>10 - temp Category</MenuItem>
                    <MenuItem value={11}>11 - Essay New</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <TextField
                margin="normal"
                required
                id="base64image"
                label="Image Url"
                name="ImageUrl"
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
                sx={{ width: "20rem", margin: ".4rem auto" }} // Add this line to set the desired width
              />
              <Custombutton
                type="submit"
                variant="contained"
                sx={{ mt: 2, bgcolor: "green" }}
                // onClick={handleSubmit}
              >
                Add
              </Custombutton>
            </Box>
          </Box>
        </ThemeProvider>
        <ToastContainer limit={1} position="top-right" autoClose={2000} />
      </Container>
    </div>
  );
};

export default EditBook;
