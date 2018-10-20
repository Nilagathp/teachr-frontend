import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

class ViewStudentEssay extends React.PureComponent {
  render() {
    const { answer, id, content, classes } = this.props;
    return (
      <React.Fragment>
        <Typography className={classes.text} variant="subtitle2">
          {content}
        </Typography>
        <TextField
          id={id}
          multiline
          rows="10"
          fullWidth
          variant="outlined"
          value={answer}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{ readOnly: true }}
        />
      </React.Fragment>
    );
  }
}

export default ViewStudentEssay;
