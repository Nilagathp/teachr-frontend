import React from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import MenuList from "@material-ui/core/MenuList";
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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import compareAsc from "date-fns/compareAsc";
import isBefore from "date-fns/isBefore";

import AssignmentList from "../Assignment/AssignmentList";
import NavBar from "../Navbar";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2
  },
  heading: {
    paddingTop: theme.spacing.unit,
    paddingLeft: theme.spacing.unit
  },
  formControl: {
    marginLeft: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit,
    minWidth: 140
  },
  filter: {
    marginLeft: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit
  },
  list: {
    maxHeight: 640,
    overflow: "auto"
  },
  drawer: {
    width: 200,
    flexShrink: 0
  },
  toolbar: theme.mixins.toolbar,
  root: {
    display: "flex"
  },
  drawerPaper: {
    width: 180
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginLeft: 180
  }
});

class StudentHome extends React.Component {
  state = {
    value: 0,
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

  handleClickCourse = course => {
    this.setState({ course: course.id });
  };

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { student, coursesName, classes } = this.props;
    let assignments = student.assignments
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
      assignments = assignments.filter(assignment =>
        assignmentIds.includes(assignment.id)
      );
    }
    return (
      <Paper>
        <div className={classes.root}>
          <CssBaseline />
          <NavBar handleClick={this.handleClick} />
          <Drawer
            variant="permanent"
            className={classes.drawer}
            classes={{ paper: classes.drawerPaper }}
          >
            <div className={classes.toolbar} />
            <MenuList>
              {student.courses.map(
                course =>
                  course.id === this.state.course ? (
                    <MenuItem
                      selected
                      key={course.id}
                      value={course}
                      className={classes.menuItem}
                      onClick={() => this.handleClickCourse(course)}
                    >
                      {course.name}
                    </MenuItem>
                  ) : (
                    <MenuItem
                      key={course.id}
                      value={course}
                      className={classes.menuItem}
                      onClick={() => this.handleClickCourse(course)}
                    >
                      {course.name}
                    </MenuItem>
                  )
              )}
            </MenuList>
          </Drawer>
        </div>
        <Paper className={classes.content}>
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
            <Button
              classnName={classes.filter}
              color="primary"
              onClick={this.handleClick}
            >
              Clear Filters
            </Button>
          </div>
          <Divider />
          <div className={classes.list}>
            <AssignmentList
              assignments={assignments}
              coursesName={coursesName}
              studentAssignments={student.student_assignments}
            />
          </div>
        </Paper>
      </Paper>
    );
  }
}

export default withStyles(styles)(StudentHome);
