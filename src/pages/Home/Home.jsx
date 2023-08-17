// import React from "react";
// import NavBar from "../../components/Navbar/Navbar";
// import axios from "axios";
// import SearchBar from "../../components/Searchbar/SearchBar";
// import BookContainer from "../../containers/BookContainer/BookContainer";
// const Home = () => {
//   // axios.get("http://localhost:8080/api/users/getusers").then((response) => {
//   //   console.table(response.data.data);
//   // });
//   return (
//     <div>
//       <NavBar />
//       <SearchBar />
//       <BookContainer />
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import NavBar from "../../components/Navbar/Navbar";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Login from "../Login/Login";

const Home = ({ isloggedIn, setLoggedIn, setRole, role }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState(null); // Add this line

  useEffect(() => {
    axios
      .get("https://book-e-sell-node-api.vercel.app/api/book/all")
      .then((res) => {
        setData(res.data.result);
        setFilteredData(res.data.result); // Add this line
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter data based on search query
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, searchQuery]);

  useEffect(() => {
    // Update filtered data when selectedValue changes
    if (selectedValue) {
      setFilteredData([selectedValue]);
    } else {
      setFilteredData(data);
    }
  }, [selectedValue, data]);

  return (
    <div>
      {/* <NavBar /> */}
      {isloggedIn ? (
        <>
          <Autocomplete
            sx={{ m: "1rem auto", width: 800 }}
            freeSolo
            value={selectedValue}
            onChange={(event, newValue) => setSelectedValue(newValue)}
            options={data.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Book"
                onChange={(event) => setSearchQuery(event.target.value)}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
          <Container>
            <Grid
              container
              spacing={3}
              sx={{
                margin: "3rem",
              }}
            >
              {filteredData.map((card) => (
                <Grid
                  card
                  key={card.id}
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{ margin: " 1rem 0 " }}
                >
                  <Card
                    sx={{
                      margin: ".5rem",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                        backgroundSize: "contain",
                      }}
                      image={card.base64image}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                      <Typography>{card.description}</Typography>
                      <Typography>{`₹${card.price}`}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Add to cart</Button>
                      <Button size="small">Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      ) : (
        <Login setLoggedIn={setLoggedIn} setRole={setRole} role={role} />
      )}
    </div>
  );
};

export default Home;