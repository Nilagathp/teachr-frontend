import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

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
    course: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { teacher, courses, students, classes } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={4}>
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
                  {/* <Button size="small" color="primary">
                  Send Message
                </Button> */}
                </CardActions>
              </Card>
            ))}
          </Grid>
          <Grid item xs={8}>
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
                </Typography>
              </div>
              <Divider />
              <List>
                {teacher.assignments.map(assignment => (
                  <ListItem
                    key={assignment.id}
                    divider
                    button
                    component={Link}
                    to={`/course/${assignment.course_id}/assignment/${
                      assignment.id
                    }`}
                  >
                    <ListItemText
                      primary={assignment.name}
                      secondary={`
                      ${courses[assignment.course_id]} - ${
                        assignment.category
                      }`}
                    />
                    {/* <p>Student Assignments</p> */}
                    <ListItemSecondaryAction>
                      <Button
                        color="primary"
                        component={Link}
                        to={`/course/${assignment.course_id}/assignment/${
                          assignment.id
                        }/grade`}
                      >
                        Grade
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state.students
  };
};

export default connect(mapStateToProps)(withStyles(styles)(TeacherHome));
