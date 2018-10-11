import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Navbar = ({ logout }) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography
          variant="h3"
          component={NavLink}
          style={{ textDecoration: "none" }}
          to="/"
        >
          Mod5Project
        </Typography>
        <Button onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
