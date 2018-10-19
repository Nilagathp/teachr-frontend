import React from "react";
import Typography from "@material-ui/core/Typography";

class StudentText extends React.PureComponent {
  render() {
    const { content, classes } = this.props;
    return <Typography className={classes.text}>{content}</Typography>;
  }
}
export default StudentText;
