import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import compareAsc from "date-fns/compareAsc";

import AssignmentList from "../Assignment/AssignmentList";

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
  },
  formControl: {
    marginLeft: "20px",
    marginBottom: "10px",
    minWidth: 120
  }
};

class TeacherCourse extends React.Component {
  state = {
    category: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = event => {
    this.setState({ course: "", category: "" });
  };

  render() {
    const { teacher, course, classes } = this.props;
    let assignments = this.props.assignments.sort(function(a, b) {
      return compareAsc(a.due_date, b.due_date);
    });
    if (this.state.category) {
      assignments = assignments.filter(
        assignment => assignment.category === this.state.category
      );
    }
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
        </Typography>

        <Paper className={classes.paper}>
          <Typography variant="h4" className={classes.heading}>
            Assignments
            <FormControl className={classes.formControl}>
              <InputLabel shrink>Filter by category:</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange}
                inputProps={{ name: "category" }}
              >
                <MenuItem value="" />
                <MenuItem key={0} value={"Classwork"}>
                  Classwork
                </MenuItem>
                <MenuItem key={1} value={"Homework"}>
                  Homework
                </MenuItem>
                <MenuItem key={2} value={"Assessment"}>
                  Assessment
                </MenuItem>
              </Select>
            </FormControl>
            <Button size="small" color="primary" onClick={this.handleClick}>
              Clear Filter
            </Button>
          </Typography>
          <Divider />
          <AssignmentList
            teacher={teacher}
            assignments={assignments}
            studentAssignments={teacher.student_assignments}
            courses={teacher.courses}
          />
        </Paper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let courses = state.user.person.teacher.courses;
  let assignments = state.user.person.teacher.assignments;
  let courseId = parseInt(ownProps.match.params.id);
  return {
    course: courses.find(c => c.id === courseId),
    assignments: assignments.filter(a => a.course_id === courseId)
  };
};

const styledTeacherCourse = withStyles(styles)(TeacherCourse);
export default withRouter(connect(mapStateToProps)(styledTeacherCourse));
