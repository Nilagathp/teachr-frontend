import React from "react";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class ViewStudentMultipleChoice extends React.PureComponent {
  render() {
    const { answer, id, content, answerChoices, classes } = this.props;
    return (
      <React.Fragment>
        <Typography className={classes.text} variant="subtitle2">
          {content.question}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup id={id} value={answer} className={classes.group}>
            {answerChoices.map((answer, index) => (
              <FormControlLabel
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

export default ViewStudentMultipleChoice;
