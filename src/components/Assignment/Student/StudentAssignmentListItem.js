import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";

const StudentAssignmentListItem = ({
  teacher,
  assignment,
  studentAssignment,
  courses
}) => {
  return (
    <ListItem
      key={assignment.id}
      divider
      button
      component={Link}
      to={`/course/${assignment.course_id}/assignment/${assignment.id}`}
    >
      {courses ? (
        <ListItemText
          primary={assignment.name}
          secondary={`
              ${courses[assignment.course_id]} - ${assignment.category}`}
        />
      ) : (
        <ListItemText
          primary={assignment.name}
          secondary={`${assignment.category} - ${assignment.points} points`}
        />
      )}
      {/* <Chip
        color="primary"
        label={`${studentAssignment.status}`}
        variant="outlined"
      /> */}
    </ListItem>
  );
};

//trying to display status of assignment in chip
// const mapStateToProps = (state, ownProps) => {
//   const studentAssignments = state.user.person.student.student_assignments;
//   const studentAssignment = studentAssignments.find(
//     sa => (sa.assignment_id = ownProps.assignment.id)
//   );
//   return {
//     studentAssignment: studentAssignment
//   };
// };

export default StudentAssignmentListItem;
