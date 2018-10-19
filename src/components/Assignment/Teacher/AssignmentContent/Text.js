import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const Text = ({ type, content, classes }) => {
  return (
    <Card className={classes.card}>
      <Typography className={classes.text} color="textSecondary">
        Text
      </Typography>
      <Typography className={classes.text}>{content}</Typography>
    </Card>
  );
};

export default Text;
