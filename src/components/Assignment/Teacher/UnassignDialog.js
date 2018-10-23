import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

{
  /* <ContentTypeDialog
  selectedValue={this.state.selectedValue}
  open={this.state.open}
  onClose={this.handleClose}
/> */
}

class UnassignDialog extends React.Component {
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
      <Dialog open={this.state.createOpen} onClose={this.handleCloseDontCreate}>
        <DialogContent>
          <DialogContentTitle>Assign to students? </DialogContentTitle>
          <DialogActions>
            <Button
              color="secondary"
              onClick={() => this.handleCloseCreate(false)}
            >
              Assign later
            </Button>
            <Button
              color="primary"
              onClick={() => this.handleCloseCreate(true)}
            >
              Assign now
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

export default UnassignDialog;
