import React from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateTimePicker from "material-ui-pickers/DateTimePicker";

import {
  createAssignment,
  createAndAssignAssignment
} from "../../../redux/actions/assignmentActions";
import ContentTypeDialog from "./ContentTypeDialog";

const styles = {
  paper: {
    margin: "20px",
    maxWidth: 1000
  },
  heading: {
    padding: "20px"
  },
  button: {
    padding: "20px",
    marginLeft: "430px"
  },
  textField: {
    marginLeft: "20px",
    marginTop: "20px"
  },
  textFieldWide: {
    marginLeft: "20px",
    marginTop: "20px",
    width: "95%"
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

class CreateAssignment extends React.Component {
  state = {
    courseId: "",
    name: "",
    points: 10,
    category: 0,
    directions: "",
    content: {},
    open: false,
    selectedValue: null,
    contentInputs: [],
    dueDate: new Date(),
    createOpen: false
  };

  componentDidMount() {
    const courseId = parseInt(this.props.match.url.split("/")[2]);
    this.setState({
      courseId: courseId
    });
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    let newContentInputs = [...this.state.contentInputs, value];
    this.setState({ open: false, contentInputs: newContentInputs });
  };

  handleClickCreate = () => {
    this.setState({
      createOpen: true
    });
  };

  handleCloseCreate = value => {
    this.setState({
      createOpen: false
    });
    const assignmentParams = {
      course_id: this.state.courseId,
      name: this.state.name,
      points: this.state.points,
      category: this.state.category,
      directions: this.state.directions,
      content: this.state.content,
      due_date: this.state.dueDate,
      assigned: value
    };
    if (value) {
      this.props.createAndAssignAssignment(
        assignmentParams,
        this.props.history.push
      );
    } else {
      this.props.createAssignment(assignmentParams, this.props.history.push);
    }
  };

  handleCloseDontCreate = value => {
    this.setState({
      createOpen: false
    });
  };

  removeInput = index => event => {
    let inputs = this.state.contentInputs;
    delete inputs[index];
    this.setState({ contentInputs: inputs });
  };

  renderContentInputs() {
    return this.state.contentInputs.map((input, index) => {
      switch (input) {
        case "Text":
          return (
            <div key={`item${index}`}>
              <TextField
                required
                label={input}
                multiline
                rows="4"
                variant="outlined"
                id={`item${index + 1}`}
                value={this.state.content[index]}
                onChange={this.handleChangeContent(input)}
                style={{ marginTop: "20px", marginLeft: "20px", width: "90%" }}
              />
              <IconButton
                style={{ marginTop: "20px" }}
                onClick={this.removeInput(index)}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </div>
          );
        case "Multiple Choice":
          return (
            <div key={`item${index}`}>
              <TextField
                required
                label="Multiple Choice Question"
                variant="outlined"
                id={`item${index + 1}`}
                value={this.state.content[index]}
                onChange={this.handleChangeMCQuestion(input)}
                style={{ marginTop: "20px", marginLeft: "20px", width: "90%" }}
              />
              <IconButton
                style={{ marginTop: "20px" }}
                onClick={this.removeInput(index)}
              >
                <DeleteOutlinedIcon />
              </IconButton>
              <TextField
                required
                label="Correct Answer"
                variant="outlined"
                id={`item${index + 1}`}
                value={this.state.content[index]}
                onChange={this.handleChangeMCAnswer("correctAnswer")}
                style={{ marginTop: "20px", marginLeft: "40px" }}
              />
              <TextField
                required
                label="Incorrect Answer"
                variant="outlined"
                id={`item${index + 1}`}
                value={this.state.content[index]}
                onChange={this.handleChangeMCAnswer("incorrectAnswer1")}
                style={{ marginTop: "20px", marginLeft: "10px" }}
              />
              <TextField
                required
                label="Incorrect Answer"
                variant="outlined"
                id={`item${index + 1}`}
                value={this.state.content[index]}
                onChange={this.handleChangeMCAnswer("incorrectAnswer2")}
                style={{ marginTop: "20px", marginLeft: "10px" }}
              />
              <TextField
                required
                label="Incorrect Answer"
                variant="outlined"
                id={`item${index + 1}`}
                value={this.state.content[index]}
                onChange={this.handleChangeMCAnswer("incorrectAnswer3")}
                style={{ marginTop: "20px", marginLeft: "10px" }}
              />
            </div>
          );
        case "Essay":
        case "Short Answer":
          return (
            <div key={`item${index}`}>
              <TextField
                required
                key={`item${index}`}
                variant="outlined"
                label={`${input} Question`}
                id={`item${index + 1}`}
                value={this.state.content[index]}
                onChange={this.handleChangeContent(input)}
                style={{ marginTop: "20px", marginLeft: "20px", width: "90%" }}
              />
              <IconButton
                style={{ marginTop: "20px" }}
                onClick={this.removeInput(index)}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </div>
          );
        default:
          return null;
      }
    });
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

  handleChangeMCQuestion = name => event => {
    let newContent = this.state.content;
    newContent[event.target.id] && newContent[event.target.id]["content"]
      ? (newContent[event.target.id] = {
          type: "Multiple Choice",
          content: {
            ...this.state.content[event.target.id]["content"],
            question: event.target.value
          }
        })
      : (newContent[event.target.id] = {
          type: "Multiple Choice",
          content: {
            question: event.target.value,
            answers: {}
          }
        });
    this.setState({
      content: newContent
    });
  };

  handleChangeMCAnswer = name => event => {
    let newContent = this.state.content;
    if (newContent[event.target.id] && newContent[event.target.id]["content"]) {
      if (newContent[event.target.id]["content"]["answers"]) {
        let newAnswers = this.state.content[event.target.id]["content"][
          "answers"
        ];
        newAnswers[name] = event.target.value;
        newContent[event.target.id] = {
          type: "Multiple Choice",
          content: {
            ...this.state.content[event.target.id]["content"],
            answers: newAnswers
          }
        };
      } else {
        let newAnswers = {};
        newAnswers[name] = event.target.value;
        newContent[event.target.id] = {
          type: "Multiple Choice",
          content: {
            ...this.state.content[event.target.id]["content"],
            answers: newAnswers
          }
        };
      }
    } else {
      let newAnswers = {};
      newAnswers[name] = event.target.value;
      newContent[event.target.id] = {
        type: "Multiple Choice",
        content: {
          question: "",
          answers: newAnswers
        }
      };
    }
    this.setState({
      content: newContent
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.handleClickCreate();
  };

  render() {
    const { courses, classes } = this.props;
    return courses ? (
      <>
        <Typography variant="h4" className={classes.text}>
          Create Assignment
          <Button color="primary" onClick={() => this.props.history.goBack()}>
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
            label="Assignment Name"
            value={this.state.name}
            variant="outlined"
            onChange={this.handleChange("name")}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            select
            label="Category"
            variant="outlined"
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
            variant="outlined"
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
            label="Directions"
            variant="outlined"
            value={this.state.directions}
            onChange={this.handleChange("directions")}
            className={classes.textFieldWide}
            margin="normal"
          />
          {this.renderContentInputs()}
          <Button color="primary" onClick={this.handleClickOpen}>
            Add Content
          </Button>
          <ContentTypeDialog
            selectedValue={this.state.selectedValue}
            open={this.state.open}
            onClose={this.handleClose}
          />
          <Button className={classes.button} color="primary" type="submit">
            Create Assignment
          </Button>
          <Dialog
            open={this.state.createOpen}
            onClose={this.handleCloseDontCreate}
          >
            <DialogContent>
              <DialogTitle>Assign to students?</DialogTitle>
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
        </form>
      </>
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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { createAssignment, createAndAssignAssignment }
  )(CreateAssignment)
);
