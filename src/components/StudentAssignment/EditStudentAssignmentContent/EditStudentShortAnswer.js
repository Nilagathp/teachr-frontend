import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

class EditStudentShortAnswer extends React.PureComponent {
  render() {
    const { id, content, handleChange, classes } = this.props;
    return (
      <React.Fragment>
        <Typography className={classes.text} variant="subtitle2">
          {content}
        </Typography>
        <TextField
          required
          id={id}
          multiline
          rows="3"
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
  }
}

export default EditStudentShortAnswer;
