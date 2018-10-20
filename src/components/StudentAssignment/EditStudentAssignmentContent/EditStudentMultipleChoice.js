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

  componentDidMount() {
    this.setState({ value: this.props.answer });
  }

  handleClick = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const {
      id,
      content,
      answer,
      answerChoices,
      handleChange,
      classes
    } = this.props;
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
            {answerChoices.map((answerChoice, index) => (
              <FormControlLabel
                onClick={handleChange}
                key={index}
                value={answerChoice}
                control={<Radio id={id} />}
                label={answerChoice}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </React.Fragment>
    );
  }
}

export default EditStudentMultipleChoice;
