import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

const EditStudentMultipleChoice = ({
  id,
  item,
  handleChangeQuestion,
  handleChangeMCAnswer,
  classes
}) => {
  return (
    <div>
      <TextField
        required
        id={id}
        label={`${item.type} Question`}
        variant="outlined"
        multiline
        className={classes.textFieldWide}
        value={item.content.question}
        onChange={handleChangeQuestion}
      />
      <TextField
        required
        id={id}
        label="Correct Answer"
        variant="outlined"
        className={classes.textFieldLeft}
        value={item.content.answers.correctAnswer}
        onChange={handleChangeMCAnswer("correctAnswer")}
      />
      <TextField
        required
        id={id}
        label="Incorrect Answer"
        variant="outlined"
        className={classes.textField}
        value={item.content.answers.incorrectAnswer1}
        onChange={handleChangeMCAnswer("incorrectAnswer1")}
      />
      <TextField
        required
        id={id}
        label="Incorrect Answer"
        variant="outlined"
        className={classes.textField}
        value={item.content.answers.incorrectAnswer2}
        onChange={handleChangeMCAnswer("incorrectAnswer2")}
      />
      <TextField
        required
        id={id}
        label="Incorrect Answer"
        variant="outlined"
        className={classes.textField}
        value={item.content.answers.incorrectAnswer3}
        onChange={handleChangeMCAnswer("incorrectAnswer3")}
      />
    </div>
  );
};

export default EditStudentMultipleChoice;
