import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { logOutUser } from "../redux/actions/userActions";

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    root: {
      display: "flex"
    }
  }
});

function Navbar({ person, logOutUser, handleClick, classes }) {
  let name;
  person.teacher ? (name = person.teacher.name) : (name = person.student.name);
  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <Toolbar>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Button
            onClick={handleClick}
            style={{
              textDecoration: "none",
              textTransform: "none",
              fontSize: 20,
              paddingLeft: 0,
              margin: 0
            }}
          >
            {name}
          </Button>
        </Link>
        {person ? (
          <Button style={{ marginLeft: "auto" }} onClick={logOutUser}>
            Logout
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => {
  return { person: state.user.person };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { logOutUser }
  )(Navbar)
);
