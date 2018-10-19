import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { updateAssignment } from "../../../redux/actions/assignmentActions";
import EditMultipleChoice from "./EditAssignmentContent/EditMultipleChoice";
import EditShortAnswerOrEssay from "./EditAssignmentContent/EditShortAnswerOrEssay";
import EditText from "./EditAssignmentContent/EditText";

const styles = {
  paper: {
    margin: "20px",
    maxWidth: "95%",
    display: "flex",
    flexWrap: "wrap"
  },
  heading: {
    marginLeft: "20px",
    marginTop: "20px",
    paddingTop: "20px"
  },
  button: {
    padding: "20px",
    marginLeft: "80%"
  },
  textField: {
    marginLeft: "20px",
    marginTop: "20px",
    marginRight: "20px",
    maxWidth: "93%"
  },
  card: {
    margin: "20px",
    padding: "5px"
  },
  textFieldWide: {
    marginLeft: "20px",
    marginTop: "20px",
    width: "95%"
  },
  textFieldLeft: {
    marginLeft: "40px",
    marginTop: "20px"
  }
};

const categories = [
  {
    value: 0,
    label: "CW"
  },
  {
    value: 1,
    label: "HW"
  },
  {
    value: 2,
    label: "TQP"
  }
];

class EditAssignment extends React.Component {
  state = {};

  static getDerivedStateFromProps(props, state) {
    if (props.assignment && props.assignment.id !== state.assignmentId) {
      let categoryHash = { CW: 0, HW: 1, TQP: 2 };
      return {
        courseId: props.assignment.course_id,
        name: props.assignment.name,
        points: props.assignment.points,
        category: categoryHash[props.assignment.category],
        directions: props.assignment.directions,
        content: props.assignment.content,
        assignmentId: props.assignment.id
      };
    } else {
      return null;
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleChangeContent = name => event => {
    let newContent = this.state.content;
    newContent[event.target.id] = { type: name, content: event.target.value };
    this.setState({
      content: newContent
    });
  };

  handleChangeMCQuestion = name => event => {
    let newContent = this.state.content;
    newContent[event.target.id] = {
      type: "Multiple Choice",
      content: {
        ...this.state.content[event.target.id]["content"],
        question: event.target.value
      }
    };
    this.setState({
      content: newContent
    });
  };

  handleChangeMCAnswer = name => event => {
    let newContent = this.state.content;
    let newAnswers = this.state.content[event.target.id]["content"]["answers"];
    newAnswers[name] = event.target.value;
    newContent[event.target.id] = {
      type: "Multiple Choice",
      content: {
        ...this.state.content[event.target.id]["content"],
        answers: newAnswers
      }
    };
    this.setState({
      content: newContent
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const assignmentId = this.state.assignmentId;
    const assignmentParams = {
      course_id: this.state.courseId,
      name: this.state.name,
      points: this.state.points,
      category: this.state.category,
      directions: this.state.directions,
      content: this.state.content
    };
    this.props.updateAssignment(
      assignmentId,
      assignmentParams,
      this.props.history.push
    );
  };

  render() {
    const { assignment, courses, classes } = this.props;
    return courses ? (
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.heading}>
          Edit Assignment
          <Button
            color="primary"
            component={Link}
            to={`/course/${assignment.course_id}/assignment/${assignment.id}`}
          >
            Cancel
          </Button>
        </Typography>
        <Divider />
        <form onSubmit={this.handleSubmit}>
          <TextField
            select
            label="Course"
            className={classes.textField}
            value={this.state.courseId}
            onChange={this.handleChange("courseId")}
            SelectProps={{ MenuProps: { className: classes.menu } }}
            margin="normal"
          >
            {courses.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Assignment Name"
            value={this.state.name}
            onChange={this.handleChange("name")}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            select
            label="Category"
            className={classes.textField}
            value={this.state.category}
            onChange={this.handleChange("category")}
            SelectProps={{ MenuProps: { className: classes.menu } }}
            margin="normal"
          >
            {categories.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Points"
            value={this.state.points}
            onChange={this.handleChange("points")}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputProps: {
                min: 0
              }
            }}
            margin="normal"
          />
          <TextField
            multiline
            fullWidth
            label="Directions"
            value={this.state.directions}
            onChange={this.handleChange("directions")}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          {Object.keys(assignment.content).map(key => {
            const item = assignment.content[key];
            if (item.type === "Multiple Choice") {
              return (
                <EditMultipleChoice
                  key={key}
                  id={key}
                  item={item}
                  classes={classes}
                  handleChangeQuestion={this.handleChangeMCQuestion(
                    "Multiple Choice"
                  )}
                  handleChangeCorrectAnswer={this.handleChangeMCAnswer(
                    "correctAnswer"
                  )}
                  handleChangeIncorrectAnswer1={this.handleChangeMCAnswer(
                    "incorrectAnswer1"
                  )}
                  handleChangeIncorrectAnswer2={this.handleChangeMCAnswer(
                    "incorrectAnswer2"
                  )}
                  handleChangeIncorrectAnswer3={this.handleChangeMCAnswer(
                    "incorrectAnswer3"
                  )}
                />
              );
            } else if (item.type === "Text") {
              return (
                <EditText
                  key={key}
                  id={key}
                  item={item}
                  classes={classes}
                  handleChange={this.handleChangeContent("Text")}
                />
              );
            } else {
              return (
                <EditShortAnswerOrEssay
                  key={key}
                  id={key}
                  item={item}
                  classes={classes}
                  handleChange={this.handleChangeContent(`${item.type}`)}
                />
              );
            }
          })}
          <Button color="primary" className={classes.button} type="submit">
            Update Assignment
          </Button>
        </form>
      </Paper>
    ) : null;
  }
}

const mapStateToProps = (state, ownProps) => {
  let courses;
  let assignment;
  if (state.user && state.user.person.teacher) {
    courses = state.user.person.teacher.courses;
    const assignmentId = parseInt(ownProps.match.params.id);
    const courseId = parseInt(ownProps.match.url.split("/")[2]);
    assignment = state.user.person.teacher.assignments.find(
      assignment =>
        assignment.id === assignmentId && assignment.course_id === courseId
    );
  }
  return {
    courses: courses,
    assignment: assignment
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { updateAssignment }
  )(EditAssignment)
);
