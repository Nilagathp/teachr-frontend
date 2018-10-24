import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import compareAsc from "date-fns/compareAsc";
import isBefore from "date-fns/isBefore";

import { changeCourse, clearCourse } from "../../redux/actions/courseActions";
import AssignmentList from "../Assignment/AssignmentList";
import Navbar from "../Navbar";

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
    marginLeft: 180,
    minHeight: 900
  }
});

class TeacherHome extends React.Component {
  state = {
    value: 0,
    courseId: "",
    category: ""
  };

  static getDerivedStateFromProps = (props, state) => {
    if (props.selectedCourseId) {
      return {
        courseId: props.selectedCourseId,
        value: state.value,
        category: state.category
      };
    } else {
      return null;
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = event => {
    this.setState({ courseId: "", category: "" });
    this.props.clearCourse(this.props.history.push);
  };

  handleChangeCourse = event => {
    this.setState({ courseId: event.target.value });
    this.props.changeCourse(event.target.value, this.props.history.push);
  };

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { teacher, coursesName, classes } = this.props;
    let assignments = teacher.assignments.sort(function(a, b) {
      return compareAsc(a.due_date, b.due_date);
    });
    if (this.state.courseId) {
      assignments = assignments.filter(
        assignment => assignment.course_id === this.state.courseId
      );
    }
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
    return (
      <>
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
              value={this.state.courseId}
              onChange={this.handleChangeCourse}
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
          <Button size="small" color="primary" onClick={this.handleClick}>
            Clear Filters
          </Button>
        </div>

        <Divider />
        <AssignmentList
          teacher={teacher}
          assignments={assignments}
          coursesName={coursesName}
          studentAssignments={teacher.student_assignments}
          courses={teacher.courses}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedCourseId: state.selectedCourseId
  };
};

const styledTeacherHome = withStyles(styles)(TeacherHome);
export default withRouter(
  connect(
    mapStateToProps,
    { changeCourse, clearCourse }
  )(styledTeacherHome)
);
