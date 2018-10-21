import React from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const EditText = ({ id, item, handleChange, removeInput, classes }) => {
  return (
    <div>
      <TextField
        required
        id={id}
        label="Text"
        variant="outlined"
        multiline
        className={classes.textFieldWide}
        value={item.content}
        onChange={handleChange}
      />
      <IconButton style={{ marginTop: "20px" }} onClick={removeInput(id)}>
        <DeleteOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default EditText;
