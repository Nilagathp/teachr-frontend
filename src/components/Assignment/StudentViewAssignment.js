import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const styles = {
  paper: {
    margin: "20px"
  },
  card: {
    margin: "20px",
    maxWidth: 400
  },
  heading: {
    marginLeft: "20px",
    marginTop: "20px"
  },
  button: {
    paddingLeft: "20px"
  },
  text: {
    marginLeft: "20px"
  }
};

class StudentViewAssignment extends React.Component {
  render() {
    const { course, assignment, classes } = this.props;
    if (assignment) {
      return (
        <React.Fragment>
          <Typography variant="h4" className={classes.heading}>
            {assignment.name}
            <Button color="primary">Begin Assignment</Button>
          </Typography>
          <Typography variant="h6" className={classes.text}>
            {`${course.name} - ${assignment.category} - ${
              assignment.points
            } points`}
          </Typography>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

const styledStudentViewAssignment = withStyles(styles)(StudentViewAssignment);
export default withRouter(
  connect(
    null,
    null
  )(styledStudentViewAssignment)
);
