import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

class ContentTypeDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { onClose, selectedValue, ...other } = this.props;
    const types = ["Text", "Short Answer", "Multiple Choice", "Essay"];
    return (
      <Dialog onClose={this.handleClose} {...other}>
        <DialogTitle>Select content type</DialogTitle>
        <div>
          <List>
            {types.map(type => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(type)}
                key={type}
              >
                <ListItemText primary={type} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

export default ContentTypeDialog;
