import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Navbar = ({ user, loggedIn, logout }) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {user && user.person.teacher ? (
          <Typography
            variant="h6"
            component={NavLink}
            style={{ textDecoration: "none" }}
            to="/home"
          >
            {user.person.teacher.name}
          </Typography>
        ) : null}
        {loggedIn ? <Button onClick={logout}>Logout</Button> : null}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
