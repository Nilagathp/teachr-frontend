import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

class ViewStudentShortAnswer extends React.PureComponent {
  render() {
    const { id, answer, content, handleChange, classes } = this.props;
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
          value={answer}
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

export default ViewStudentShortAnswer;
