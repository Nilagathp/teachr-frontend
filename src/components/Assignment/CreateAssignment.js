import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const styles = {
  paper: {
    margin: "20px"
  },
  card: {
    margin: "20px",
    maxWidth: 400
  },
  heading: {
    padding: "20px"
  },
  button: {
    paddingLeft: "20px"
  },
  textField: {
    marginLeft: "10px"
  }
};

class CreateAssignment extends React.Component {
  state = {
    course: ""
  };

  componentDidMount() {
    const courseId = parseInt(this.props.match.url.split("/")[2]);
    this.setState({
      course: courseId
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { courses, classes } = this.props;
    return courses ? (
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.heading}>
          Create Assignment
        </Typography>
        <Divider />
        <Typography variant="h5" className={classes.heading}>
          Course:
          <TextField
            select
            className={classes.textField}
            value={this.state.course}
            onChange={this.handleChange("course")}
            SelectProps={{ MenuProps: { className: classes.menu } }}
          >
            {courses.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Typography>
      </Paper>
    ) : null;
  }
}

const mapStateToProps = state => {
  let courses;
  if (state.user && state.user.person.teacher) {
    courses = state.user.person.teacher.courses;
  }
  return {
    courses: courses
  };
};

const styledCreateAssignment = withStyles(styles)(CreateAssignment);
export default withRouter(connect(mapStateToProps)(styledCreateAssignment));
