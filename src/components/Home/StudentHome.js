import React from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

import AssignmentList from "../Assignment/AssignmentList";

const styles = {
  card: {
    maxWidth: 345,
    margin: "20px"
  },
  paper: {
    margin: "20px"
  },
  heading: {
    paddingTop: "20px",
    paddingLeft: "20px"
  },
  formControl: {
    marginLeft: "20px",
    marginBottom: "10px",
    minWidth: 120
  }
};

class StudentHome extends React.Component {
  state = {
    course: "",
    category: "",
    status: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = event => {
    this.setState({ course: "", category: "", status: "" });
  };

  render() {
    const { student, coursesName, classes } = this.props;
    let assignments = student.assignments;
    if (this.state.course) {
      assignments = assignments.filter(
        assignment => assignment.course_id === this.state.course
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
      if (this.state.status === "not_started") {
        let allStudentAssignmentIds = student.student_assignments.map(
          student_assignment => student_assignment.assignment_id
        );
        assignments = assignments.filter(
          assignment =>
            !allStudentAssignmentIds.includes(assignment.id) ||
            assignmentIds.includes(assignment.id)
        );
      } else {
        assignments = assignments.filter(assignment =>
          assignmentIds.includes(assignment.id)
        );
      }
    }
    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={4}>
            {student.courses.map(course => (
              <Card key={course.id} className={classes.card}>
                <CardActionArea component={Link} to={`/course/${course.id}`}>
                  <CardContent>
                    <Typography
                      variant="h4"
                      component="h2"
                      className={classes.title}
                      gutterBottom
                    >
                      {course.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Typography variant="h4" className={classes.heading}>
                Assignments
                <FormControl className={classes.formControl}>
                  <InputLabel shrink>Filter by course:</InputLabel>
                  <Select
                    value={this.state.course}
                    onChange={this.handleChange}
                    inputProps={{ name: "course" }}
                  >
                    <MenuItem value="" />
                    {student.courses.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
              </Typography>
              <Divider />
              <AssignmentList
                assignments={assignments}
                coursesName={coursesName}
                studentAssignments={student.student_assignments}
              />
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(StudentHome);
