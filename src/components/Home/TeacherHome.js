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
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

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

const TeacherHome = ({ teacher, courses, classes }) => {
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
            <Typography variant="h4" className={classes.heading}>
              Assignments
            </Typography>
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
                  {/* <ListItemSecondaryAction>
                    <Button>Due on:</Button>
                  </ListItemSecondaryAction> */}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(TeacherHome);
