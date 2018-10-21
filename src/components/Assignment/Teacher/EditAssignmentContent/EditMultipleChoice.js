import React from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const EditMultipleChoice = ({
  id,
  item,
  handleChangeQuestion,
  handleChangeMCAnswer,
  removeInput,
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
      <IconButton style={{ marginTop: "20px" }} onClick={removeInput(id)}>
        <DeleteOutlinedIcon />
      </IconButton>
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

export default EditMultipleChoice;
