import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  card: {
    maxWidth: 345,
    margin: "20px"
  }
};

const TeacherHome = ({ user, classes }) => {
  const teacher = user.person.teacher;
  return (
    <div>
      <h3>{teacher.name}</h3>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          {teacher.courses.map(course => (
            <Card key={course.id} className={classes.card}>
              <CardActionArea onClick={() => console.log("click")}>
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
                <Button size="small" color="primary">
                  Add Assignment
                </Button>
                <Button size="small" color="primary">
                  Send Message
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Paper>Feed</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(TeacherHome);
