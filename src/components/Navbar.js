import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { clearCourse } from "../redux/actions/courseActions";
import { clearCategory } from "../redux/actions/categoryActions";
import { clearStatus } from "../redux/actions/statusActions";
import { clearValue } from "../redux/actions/valueActions";

import { logOutUser } from "../redux/actions/userActions";

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    root: {
      display: "flex"
    }
  }
});

class Navbar extends React.Component {
  render() {
    const { person, logOutUser, classes } = this.props;
    let name;
    person.teacher
      ? (name = person.teacher.name)
      : (name = person.student.name);
    return (
      <AppBar
        id="navbar"
        position="fixed"
        color="default"
        className={classes.appBar}
      >
        <Toolbar>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <Button
              onClick={() => {
                this.props.clearValue();
                this.props.clearCategory();
                this.props.clearCourse();
                this.props.clearStatus();
              }}
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
}

const mapStateToProps = state => {
  return { person: state.user.person };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { logOutUser, clearCategory, clearValue, clearCourse, clearStatus }
  )(Navbar)
);

export { Navbar };
