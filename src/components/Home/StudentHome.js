import React from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

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
    category: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { student, courses, classes } = this.props;
    let assignments = student.assignments;
    this.state.course
      ? (assignments = assignments.filter(
          assignment => assignment.course_id === this.state.course
        ))
      : (assignments = assignments);
    this.state.category
      ? (assignments = assignments.filter(
          assignment => assignment.category === this.state.category
        ))
      : (assignments = assignments);
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
                <CardActions>
                  {/* <Button size="small" color="primary">
                  Send Message
                </Button> */}
                </CardActions>
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
              </Typography>
              <Divider />
              <AssignmentList assignments={assignments} courses={courses} />
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(StudentHome);
