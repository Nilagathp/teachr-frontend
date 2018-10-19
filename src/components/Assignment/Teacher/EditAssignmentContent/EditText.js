import React from "react";
import TextField from "@material-ui/core/TextField";

const EditText = ({ id, item, handleChange, classes }) => {
  return (
    <TextField
      id={id}
      label="Text"
      variant="outlined"
      multiline
      className={classes.textFieldWide}
      value={item.content}
      onChange={handleChange}
    />
  );
};

export default EditText;
