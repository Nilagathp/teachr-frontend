import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const TeacherHome = ({ user }) => {
  const teacher = user.person.teacher;
  return (
    <div>
      <h3>{teacher.name}</h3>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Paper aligned="center">
            Courses
            {teacher.courses.map(course => (
              <li>{course.name}</li>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>Feed</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default TeacherHome;
