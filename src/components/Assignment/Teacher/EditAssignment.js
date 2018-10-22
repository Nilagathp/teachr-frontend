import React from "react";
import { connect } from "react-redux";

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
import ContentTypeDialog from "./ContentTypeDialog";
import DateTimePicker from "material-ui-pickers/DateTimePicker";

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
    width: "90%"
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
  state = { open: false, selectedValue: null };

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
        assignmentId: props.assignment.id,
        dueDate: props.assignment.due_date
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

  handleDateChange = date => {
    this.setState({ dueDate: date });
  };

  handleChangeContent = name => event => {
    let newContent = this.state.content;
    newContent[event.target.id] = { type: name, content: event.target.value };
    this.setState({
      content: newContent
    });
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    let newContent = this.state.content;
    if (value) {
      let lastKey = Object.keys(newContent)[Object.keys(newContent).length - 1];
      let newKey;
      lastKey
        ? (newKey = `item${parseInt(lastKey.substring(4)) + 1}`)
        : (newKey = "item1");
      value === "Multiple Choice"
        ? (newContent[newKey] = {
            content: {
              question: "",
              answers: {
                correctAnswer: "",
                incorrectAnswer1: "",
                incorrectAnswer2: "",
                incorrectAnswer3: ""
              }
            },
            type: value
          })
        : (newContent[newKey] = { content: "", type: value });
    }
    this.setState({ open: false, content: newContent });
  };

  removeInput = key => event => {
    let inputs = this.state.content;
    delete inputs[key];
    this.setState({ content: inputs });
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
      content: this.state.content,
      due_date: this.state.dueDate
    };
    this.props.updateAssignment(
      assignmentId,
      assignmentParams,
      this.props.history.push
    );
  };

  render() {
    const { courses, history, classes } = this.props;
    return courses ? (
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.heading}>
          Edit Assignment
          <Button color="primary" onClick={() => history.goBack()}>
            Cancel
          </Button>
        </Typography>
        <Divider />
        <form onSubmit={this.handleSubmit}>
          <TextField
            select
            variant="outlined"
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
            required
            variant="outlined"
            label="Assignment Name"
            value={this.state.name}
            onChange={this.handleChange("name")}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            select
            variant="outlined"
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
            variant="outlined"
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
                min: 0,
                max: 100
              }
            }}
            margin="normal"
          />
          <DateTimePicker
            required
            label="Due on:"
            variant="outlined"
            className={classes.textField}
            value={this.state.dueDate}
            onChange={this.handleDateChange}
          />
          <TextField
            required
            variant="outlined"
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
          {Object.keys(this.state.content).map(key => {
            const item = this.state.content[key];
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
                  handleChangeMCAnswer={this.handleChangeMCAnswer}
                  removeInput={this.removeInput}
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
                  removeInput={this.removeInput}
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
                  removeInput={this.removeInput}
                />
              );
            }
          })}
          <Button color="primary" onClick={this.handleClickOpen}>
            Add Content
          </Button>
          <ContentTypeDialog
            selectedValue={this.state.selectedValue}
            open={this.state.open}
            onClose={this.handleClose}
          />
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
    assignment: assignment,
    history: ownProps.history
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { updateAssignment }
  )(EditAssignment)
);
