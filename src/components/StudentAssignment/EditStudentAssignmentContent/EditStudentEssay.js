import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

class EditStudentEssay extends React.PureComponent {
  render() {
    const { id, type, content, handleChange, classes } = this.props;
    return (
      <React.Fragment>
        <Typography className={classes.text} variant="subtitle2">
          {content}
        </Typography>
        <TextField
          required
          id={id}
          multiline
          rows="10"
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

export default EditStudentEssay;
