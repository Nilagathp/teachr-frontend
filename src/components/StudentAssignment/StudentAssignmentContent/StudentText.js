import React from "react";
import Typography from "@material-ui/core/Typography";

const StudentText = ({ content, classes }) => {
  return <Typography className={classes.text}>{content}</Typography>;
};

export default StudentText;
