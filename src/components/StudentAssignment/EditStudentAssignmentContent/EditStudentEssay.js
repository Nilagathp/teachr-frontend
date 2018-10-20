import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

class EditStudentEssay extends React.Component {
  state = {
    value: ""
  };

  componentDidMount() {
    this.setState({ value: this.props.answer });
  }

  handleInputChange = event => {
    this.setState({ value: event.target.value });
    this.props.handleChange(event);
  };

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
          rows="10"
          value={this.state.value}
          fullWidth
          variant="outlined"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          onChange={this.handleInputChange}
        />
      </React.Fragment>
    );
  }
}

export default EditStudentEssay;
