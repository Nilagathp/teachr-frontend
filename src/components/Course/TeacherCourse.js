import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";

const styles = {
  paper: {
    margin: "20px"
  },
  card: {
    margin: "20px",
    maxWidth: 400
  },
  heading: {
    padding: "20px"
  },
  button: {
    paddingLeft: "20px"
  }
};

const TeacherCourse = ({ course, assignments, sections, classes }) => {
  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.heading}>
        {course.name}
        <Button
          className={classes.button}
          color="primary"
          component={Link}
          to={`/course/${course.id}/assignment/create`}
        >
          Create Assignment
        </Button>
        {/* <Button className={classes.button} color="primary">
          Send message
        </Button> */}
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography variant="h4" className={classes.heading}>
              Sections
            </Typography>
            <Divider />
            <List>
              {sections
                ? sections.map(section => (
                    <ListItem key={section.id} divider>
                      <ListItemText primary={`Period ${section.period}`} />
                    </ListItem>
                  ))
                : null}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Typography variant="h4" className={classes.heading}>
              Assignments
            </Typography>
            <Divider />
            <List>
              {assignments
                ? assignments.map(assignment => (
                    <ListItem
                      key={assignment.id}
                      divider
                      button
                      component={Link}
                      to={`/course/${course.id}/assignment/${assignment.id}`}
                    >
                      <ListItemText
                        primary={assignment.name}
                        secondary={`${assignment.category} - ${
                          assignment.points
                        } points`}
                      />
                      <ListItemSecondaryAction>
                        <Button
                          color="primary"
                          component={Link}
                          to={`/course/${assignment.course_id}/assignment/${
                            assignment.id
                          }/grade`}
                        >
                          Grade
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                : null}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  let courses = state.user.person.teacher.courses;
  let assignments = state.user.person.teacher.assignments;
  let sections = state.user.person.teacher.sections;
  let courseId = parseInt(ownProps.match.params.id);
  return {
    course: courses.find(c => c.id === courseId),
    assignments: assignments.filter(a => a.course_id === courseId),
    sections: sections.filter(s => s.course_id === courseId)
  };
};

const styledTeacherCourse = withStyles(styles)(TeacherCourse);
export default withRouter(connect(mapStateToProps)(styledTeacherCourse));
