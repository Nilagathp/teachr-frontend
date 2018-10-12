import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const TeacherHome = props => {
  return (
    <div>
      <h3>{props.user.person.name}</h3>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Paper>Left</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>Right</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default TeacherHome;
