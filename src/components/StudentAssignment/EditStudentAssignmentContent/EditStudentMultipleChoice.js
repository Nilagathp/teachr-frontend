import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class EditStudentMultipleChoice extends React.PureComponent {
  state = {
    value: ""
  };

  handleClick = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { id, content, answerChoices, handleChange, classes } = this.props;
    return (
      <React.Fragment>
        <Typography className={classes.text} variant="subtitle2">
          {content.question}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            id={id}
            onChange={this.handleClick}
            value={this.state.value}
            className={classes.group}
          >
            {answerChoices.map((answer, index) => (
              <FormControlLabel
                onClick={handleChange}
                key={index}
                value={answer}
                control={<Radio id={id} />}
                label={answer}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </React.Fragment>
    );
  }
}

export default EditStudentMultipleChoice;
