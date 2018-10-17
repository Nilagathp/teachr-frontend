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
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

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
    const { teacher, course, sections, classes } = this.props;
    let assignments = this.props.assignments;
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
                  Clear Filter
                </Button>
              </Typography>
              <Divider />
              <List>
                <AssignmentList teacher={teacher} assignments={assignments} />
              </List>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let courses = state.user.person.teacher.courses;
  let assignments = state.user.person.teacher.assignments;
  let sections = state.user.person.teacher.sections;
  let courseId = parseInt(ownProps.match.params.id);
  return {
    teacher: state.user.person.teacher,
    course: courses.find(c => c.id === courseId),
    assignments: assignments.filter(a => a.course_id === courseId),
    sections: sections.filter(s => s.course_id === courseId)
  };
};

const styledTeacherCourse = withStyles(styles)(TeacherCourse);
export default withRouter(connect(mapStateToProps)(styledTeacherCourse));
