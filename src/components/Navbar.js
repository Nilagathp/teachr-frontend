import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { logOutUser } from "../redux/actions/userActions";

const Navbar = ({ person, logOutUser }) => {
  return (
    <AppBar position="static" color="default">
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
              <div style={{ marginLeft: "20px" }}>
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
            {person.student.courses.map(course => (
              <div style={{ marginLeft: "20px" }}>
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
        )}
        {person ? (
          <Button style={{ marginLeft: "auto" }} onClick={logOutUser}>
            Logout
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => {
  return { person: state.user.person };
};

export default connect(
  mapStateToProps,
  { logOutUser }
)(Navbar);
