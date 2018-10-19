import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const EditStudentEssay = ({ type, content, classes }) => {
  return (
    <Card className={classes.card}>
      <Typography className={classes.text} color="textSecondary">
        {type}
      </Typography>
      <Typography className={classes.text} variant="subtitle2">
        {content}
      </Typography>
    </Card>
  );
};

export default EditStudentEssay;
