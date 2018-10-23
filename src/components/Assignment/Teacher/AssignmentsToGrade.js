import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import format from "date-fns/format";

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
    marginTop: "20px",
    paddingTop: "20px"
  },
  button: {
    paddingLeft: "20px"
  },
  text: {
    marginLeft: "20px",
    paddingBottom: "10px"
  },
  formControl: {
    marginLeft: "20px",
    marginBottom: "10px",
    minWidth: 120
  }
};

class AssignmentsToGrade extends React.Component {
  state = {
    status: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = event => {
    this.setState({ status: "" });
  };

  render() {
    const {
      user,
      assignment,
      course,
      studentAssignments,
      students,
      history,
      classes
    } = this.props;
    let assignments = studentAssignments;
    if (this.state.status) {
      assignments = assignments.filter(
        assignment => assignment.status === this.state.status
      );
    }
    return user ? (
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.heading}>
          {assignment.name}
          <Button color="primary" onClick={() => history.goBack()}>
            Back
          </Button>
          <Button
            color="primary"
            onClick={() => this.props.history.push(`/course/${course.id}`)}
          >
            View Course
          </Button>
        </Typography>
        <Typography variant="h6" className={classes.text}>
          {`${course.name} - ${assignment.category} - ${
            assignment.points
          } points`}
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel shrink>Filter by status:</InputLabel>
          <Select
            value={this.state.status}
            onChange={this.handleChange}
            inputProps={{ name: "status" }}
          >
            <MenuItem value="" />
            <MenuItem key={0} value={"not_started"}>
              not started
            </MenuItem>
            <MenuItem key={1} value={"in_progress"}>
              in progress
            </MenuItem>
            <MenuItem key={2} value={"submitted"}>
              submitted
            </MenuItem>
            <MenuItem key={3} value={"graded"}>
              graded
            </MenuItem>
          </Select>
        </FormControl>
        <Button size="small" color="primary" onClick={this.handleClick}>
          Clear Filter
        </Button>
        <Typography variant="h6" className={classes.text}>
          {`Due on: ${format(assignment.due_date, "PPPP @ p")}`}
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
                  to={`/course/${course.id}/assignment/${
                    assignment.assignment_id
                  }/grade/student/${assignment.student_id}`}
                >
                  <ListItemText
                    primary={
                      students.find(
                        student => student.id === assignment.student_id
                      ).name
                    }
                    secondary={`Status: ${assignment.status
                      .split("_")
                      .join(" ")}`}
                  />
                </ListItem>
              ))
            : null}
        </List>
      </Paper>
    ) : null;
  }
}

const mapStateToProps = (state, ownProps) => {
  let assignment;
  let studentAssignments;
  let course;
  let students;
  if (state.user && state.user.person.teacher) {
    const assignmentId = parseInt(ownProps.match.url.split("/")[4]);
    assignment = state.user.person.teacher.assignments.find(
      assignment => assignment.id === assignmentId
    );
    course = state.user.person.teacher.courses.find(
      course => course.id === assignment.course_id
    );
    students = state.user.person.teacher.students;
    studentAssignments = state.user.person.teacher.student_assignments.filter(
      studentAssignment => studentAssignment.assignment_id === assignmentId
    );
  }
  return {
    user: state.user,
    assignment: assignment,
    course: course,
    students: students,
    studentAssignments: studentAssignments,
    history: ownProps.history
  };
};

export default withStyles(styles)(connect(mapStateToProps)(AssignmentsToGrade));
