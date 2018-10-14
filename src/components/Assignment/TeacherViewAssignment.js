import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
  }
};

const TeacherViewAssignment = ({ assignment, classes }) => {
  if (assignment) {
    return (
      <React.Fragment>
        <Typography variant="h4" className={classes.heading}>
          {assignment.name}
          <Button className={classes.button} color="primary">
            Edit
          </Button>
          <Button className={classes.button} color="primary">
            Assign
          </Button>
        </Typography>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default withStyles(styles)(TeacherViewAssignment);
