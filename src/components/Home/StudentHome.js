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
              </Typography>
              <Divider />
              <AssignmentList assignments={student.assignments} />
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(StudentHome);
