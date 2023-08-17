import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NavBar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Manage from "../pages/Admin/Manage";
import ManageBooks from "../pages/Manage/ManageBooks";
import AddBook from "../pages/Manage/AddBook";
import AdminManageBooks from "../pages/Admin/AdminManageBooks";
import EditBook from "../pages/Admin/EditBook";
import EditUser from "../pages/Admin/EditUser";
const AllRoutes = () => {
  const [role, setRole] = useState();
  const [isloggedIn, setLoggedIn] = useState(false);
  const [bookId, setBookId] = useState();
  const [userId, setUserId] = useState();
  return (
    <div>
      <BrowserRouter>
        <NavBar role={role} isloggedIn={isloggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          {/* <Route
            path="/home"
            element={
              <Home
                isloggedIn={isloggedIn}
                setLoggedIn={setLoggedIn}
                setRole={setRole}
                role={role}
              />
            }
          /> */}
          <Route
            path="/"
            element={
              <Home
                isloggedIn={isloggedIn}
                setLoggedIn={setLoggedIn}
                setRole={setRole}
                role={role}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/login"
            element={
              <Login setRole={setRole} role={role} setLoggedIn={setLoggedIn} />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/manage"
            element={<Manage userId={userId} setUserId={setUserId} />}
          />
          <Route path="/managebooks" element={<ManageBooks role={role} />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route
            path="/adminmanagebooks"
            element={<AdminManageBooks bookId={bookId} setBookId={setBookId} />}
          />
          <Route
            path="/editbook"
            element={<EditBook setBookId={setBookId} bookId={bookId} />}
          />
          <Route path="/edituser" element={<EditUser userId={userId} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default AllRoutes;
