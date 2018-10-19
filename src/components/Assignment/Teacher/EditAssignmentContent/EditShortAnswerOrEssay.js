import React from "react";
import TextField from "@material-ui/core/TextField";

const EditShortAnswerOrEssay = ({ id, item, handleChange, classes }) => {
  return (
    <TextField
      required
      id={id}
      label={`${item.type} Question`}
      variant="outlined"
      multiline
      className={classes.textFieldWide}
      value={item.content}
      onChange={handleChange}
    />
  );
};

export default EditShortAnswerOrEssay;
