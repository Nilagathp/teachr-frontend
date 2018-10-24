import React from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
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

class TeacherHome extends React.Component {
  state = {
    course: "",
    category: "",
    dueDate: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = event => {
    this.setState({ course: "", category: "", dueDate: "" });
  };

  render() {
    const { teacher, coursesName, classes } = this.props;
    let assignments = teacher.assignments.sort(function(a, b) {
      return compareAsc(a.due_date, b.due_date);
    });
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
    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            {teacher.courses.map(course => (
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
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/course/${course.id}/assignment/create`}
                  >
                    Create Assignment
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              <div>
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
                      {teacher.courses.map(option => (
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
                  <Button
                    size="small"
                    color="primary"
                    onClick={this.handleClick}
                  >
                    Clear Filter
                  </Button>
                </Typography>
              </div>
              <Divider />
              <AssignmentList
                teacher={teacher}
                assignments={assignments}
                coursesName={coursesName}
                studentAssignments={teacher.student_assignments}
                courses={teacher.courses}
              />
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TeacherHome);
