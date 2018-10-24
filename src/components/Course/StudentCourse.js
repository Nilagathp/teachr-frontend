import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import compareAsc from "date-fns/compareAsc";
import isBefore from "date-fns/isBefore";

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

class StudentCourse extends React.Component {
  state = {
    value: 0,
    category: "",
    status: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = event => {
    this.setState({ category: "", status: "" });
  };

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { course, student, classes } = this.props;
    let assignments = this.props.assignments
      .filter(assignment => assignment.assigned)
      .sort(function(a, b) {
        return compareAsc(a.due_date, b.due_date);
      });
    if (this.state.value === 0) {
      assignments = assignments.filter(
        assignment => !isBefore(assignment.due_date, new Date())
      );
    }
    if (this.state.value === 1) {
      assignments = assignments.filter(assignment =>
        isBefore(assignment.due_date, new Date())
      );
    }
    if (this.state.category) {
      assignments = assignments.filter(
        assignment => assignment.category === this.state.category
      );
    }
    if (this.state.status) {
      let assignmentIds = student.student_assignments
        .filter(
          student_assignment => student_assignment.status === this.state.status
        )
        .map(student_assignment => student_assignment.assignment_id);

      assignments = assignments.filter(assignment =>
        assignmentIds.includes(assignment.id)
      );
    }
    return (
      <React.Fragment>
        <Typography variant="h4" className={classes.heading}>
          {course.name}
        </Typography>

        <Paper className={classes.paper}>
          <Paper className={classes.paper}>
            <Paper position="static">
              <Tabs
                textColor="primary"
                indicatorColor="primary"
                value={this.state.value}
                onChange={this.handleChangeTab}
                centered
              >
                <Tab label="Upcoming Assignments" />
                <Tab label="Past Assignments" />
                <Tab label="All Assignments" />
              </Tabs>
            </Paper>
            <div className={classes.paper}>
              <FormControl className={classes.formControl}>
                <InputLabel shrink>Filter by category:</InputLabel>
                <Select
                  value={this.state.category}
                  onChange={this.handleChange}
                  inputProps={{ name: "category" }}
                >
                  <MenuItem value="" />
                  <MenuItem key={0} value={"CW"}>
                    CW
                  </MenuItem>
                  <MenuItem key={1} value={"HW"}>
                    HW
                  </MenuItem>
                  <MenuItem key={2} value={"TQP"}>
                    TQP
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel shrink>Filter by status:</InputLabel>
                <Select
                  value={this.state.status}
                  onChange={this.handleChange}
                  inputProps={{ name: "status" }}
                >
                  <MenuItem value="" />
                  <MenuItem key={"not_started"} value={"not_started"}>
                    not started
                  </MenuItem>
                  <MenuItem key={"in_progress"} value={"in_progress"}>
                    in progress
                  </MenuItem>
                  <MenuItem key={"submitted"} value={"submitted"}>
                    submitted
                  </MenuItem>
                  <MenuItem key={"graded"} value={"graded"}>
                    graded
                  </MenuItem>
                </Select>
              </FormControl>
              <Button size="small" color="primary" onClick={this.handleClick}>
                Clear Filter
              </Button>
            </div>
            <Divider />
            <AssignmentList
              assignments={assignments}
              studentAssignments={student.student_assignments}
            />
          </Paper>
        </Paper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let courses = state.user.person.student.courses;
  let assignments = state.user.person.student.assignments;
  let courseId = parseInt(ownProps.match.params.id);
  return {
    course: courses.find(c => c.id === courseId),
    assignments: assignments.filter(a => a.course_id === courseId)
  };
};

const styledStudentCourse = withStyles(styles)(StudentCourse);
export default withRouter(connect(mapStateToProps)(styledStudentCourse));
