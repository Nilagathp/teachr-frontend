import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
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
import {
  changeCategory,
  clearCategory
} from "../../redux/actions/categoryActions";
import { changeValue, clearValue } from "../../redux/actions/valueActions";

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
  handleClick = event => {
    this.props.clearCourse(this.props.history.push);
    this.props.clearCategory();
  };

  handleChangeCourse = event => {
    this.props.changeCourse(event.target.value, this.props.history.push);
  };

  handleChangeCategory = event => {
    this.props.changeCategory(event.target.value);
  };

  handleChangeTab = (event, value) => {
    this.props.changeValue(value);
  };

  render() {
    const { teacher, coursesName, classes } = this.props;
    let assignments = teacher.assignments.sort(function(a, b) {
      return compareAsc(a.due_date, b.due_date);
    });
    if (this.props.selectedCourseId) {
      assignments = assignments.filter(
        assignment => assignment.course_id === this.props.selectedCourseId
      );
    }
    if (this.props.value === 0) {
      assignments = assignments.filter(
        assignment => !isBefore(assignment.due_date, new Date())
      );
    }
    if (this.props.value === 1) {
      assignments = assignments.filter(assignment =>
        isBefore(assignment.due_date, new Date())
      );
    }
    if (this.props.selectedCategory) {
      assignments = assignments.filter(
        assignment => assignment.category === this.props.selectedCategory
      );
    }
    return (
      <>
        <div position="static">
          <Paper position="static">
            <Tabs
              textColor="primary"
              indicatorColor="primary"
              value={this.props.value}
              onChange={this.handleChangeTab}
              centered
            >
              <Tab label="Upcoming Assignments" />
              <Tab label="Past Assignments" />
              <Tab label="All Assignments" />
            </Tabs>
          </Paper>
          <div position="static" className={classes.paper}>
            <FormControl className={classes.formControl}>
              <InputLabel shrink>Filter by course:</InputLabel>
              <Select
                value={this.props.selectedCourseId}
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
                value={this.props.selectedCategory}
                onChange={this.handleChangeCategory}
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
        </div>
        <Divider />
        <div className={classes.list}>
          <AssignmentList
            teacher={teacher}
            assignments={assignments}
            coursesName={coursesName}
            studentAssignments={teacher.student_assignments}
            courses={teacher.courses}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedCourseId: state.selectedCourseId,
    selectedCategory: state.selectedCategory,
    selectedStatus: state.selectedStatus,
    value: state.value
  };
};

const styledTeacherHome = withStyles(styles)(TeacherHome);
export default withRouter(
  connect(
    mapStateToProps,
    {
      changeCourse,
      clearCourse,
      changeCategory,
      clearCategory,
      changeValue,
      clearValue
    }
  )(styledTeacherHome)
);
