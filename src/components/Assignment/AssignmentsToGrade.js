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
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
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

const AssignmentsToGrade = ({
  user,
  assignment,
  studentAssignments,
  students,
  classes
}) => {
  return user ? (
    <Paper className={classes.paper}>
      <Typography variant="h4" className={classes.heading}>
        {assignment.name}
      </Typography>
      <Divider />
      <List>
        {studentAssignments
          ? studentAssignments.map(assignment => (
              <ListItem
                key={assignment.id}
                divider
                button
                // component={Link}
                // to={`/course/${course.id}/assignment/${assignment.id}`}
              >
                <ListItemText
                  primary={
                    students.find(
                      student => student.id == assignment.student_id
                    ).name
                  }
                  secondary={`Status: ${assignment.status}`}
                />
                {/* <ListItemSecondaryAction>
                    <Button>Due on:</Button>
                  </ListItemSecondaryAction> */}
              </ListItem>
            ))
          : null}
      </List>
    </Paper>
  ) : null;
};

const mapStateToProps = (state, ownProps) => {
  let assignment;
  let studentAssignments;
  if (state.user && state.user.person.teacher) {
    const assignmentId = parseInt(ownProps.match.url.split("/")[4]);
    assignment = state.user.person.teacher.assignments.find(
      assignment => assignment.id === assignmentId
    );
    studentAssignments = state.students
      .map(student => student.student_assignments)
      .flat()
      .filter(
        studentAssignment => studentAssignment.assignment_id === assignmentId
      );
  }
  return {
    user: state.user,
    assignment: assignment,
    studentAssignments: studentAssignments,
    students: state.students
  };
};

const styledAssignmentsToGrade = withStyles(styles)(AssignmentsToGrade);
export default withRouter(connect(mapStateToProps)(styledAssignmentsToGrade));
