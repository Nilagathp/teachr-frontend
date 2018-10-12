import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = {
  paper: {
    margin: "20px"
  }
};

class TeacherCourse extends React.Component {
  render() {
    const { course, classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>{course.name}</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Assignments</Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let courses = state.user.person.teacher.courses;
  let courseId = parseInt(ownProps.match.params.id);
  return {
    course: courses.find(c => c.id === courseId)
  };
};

const styledTeacherCourse = withStyles(styles)(TeacherCourse);
export default withRouter(connect(mapStateToProps)(styledTeacherCourse));
