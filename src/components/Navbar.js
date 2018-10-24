import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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

function Navbar({ person, logOutUser, classes }) {
  return (
    <AppBar position="static" color="default" className={classes.appBar}>
      <Toolbar>
        {person.teacher ? (
          <React.Fragment>
            <Typography
              variant="h6"
              component={NavLink}
              style={{ textDecoration: "none" }}
              to="/home"
            >
              {person.teacher.name}
            </Typography>
            {person.teacher.courses.map(course => (
              <div key={course.id} style={{ marginLeft: "20px" }}>
                <Typography
                  component={NavLink}
                  style={{ textDecoration: "none" }}
                  to={`/course/${course.id}`}
                >
                  {course.name}
                </Typography>
              </div>
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography
              variant="h6"
              component={NavLink}
              style={{ textDecoration: "none" }}
              to="/home"
            >
              {person.student.name}
            </Typography>
            {/* {person.student.courses.map(course => (
              <div key={course.id} style={{ marginLeft: "20px" }}>
                <Typography
                  component={NavLink}
                  style={{ textDecoration: "none" }}
                  to={`/course/${course.id}`}
                >
                  {course.name}
                </Typography>
              </div>
            ))} */}
          </React.Fragment>
        )}
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
