// CartPage.js
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const CartPage = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  }));

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://book-e-sell-node-api.vercel.app/api/book/all")
      .then((response) => {
        setCartItems(response.data.result.map((item) => ({ ...item, quantity: 1 })));
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }, []);

  const updateQuantity = (index, newQuantity) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].quantity = newQuantity;
      return newItems;
    });
  };

  const removeItem = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ backgroundColor: "#d80000"}}>Name</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#d80000"}} align="right">Price</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#d80000"}} align="right">Quantity</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#d80000"}} align="right">Total</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#d80000"}} align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    sx={{m:"2px"}}
                    color="error"
                    size="small"
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </Button>
                  {item.quantity}
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{m:"2px"}}
                    size="small"
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                  >
                    +
                  </Button>
                </TableCell>
                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right">
                Total:
              </TableCell>
              <TableCell align="right">${getTotalPrice().toFixed(2)}</TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CartPage;
