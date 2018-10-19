import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

const EditStudentShortAnswer = ({ id, content, handleChange, classes }) => {
  return (
    <React.Fragment>
      <Typography className={classes.text} variant="subtitle2">
        {content}
      </Typography>
      <TextField
        id={id}
        multiline
        fullWidth
        variant="outlined"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

export default EditStudentShortAnswer;
