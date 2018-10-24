import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

import { changeCourse } from "../redux/actions/courseActions";

const styles = theme => ({
  drawer: {
    width: 200,
    flexShrink: 0
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 180
  }
});

class Sidebar extends React.Component {
  selectCourse = course => {
    this.props.changeCourse(course.id, this.props.history.push);
  };

  render() {
    const { courses, selectedCourseId, classes } = this.props;
    return (
      <Drawer
        variant="permanent"
        position="fixed"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.toolbar} />
        <MenuList>
          {courses.map(
            course =>
              course.id === selectedCourseId ? (
                <MenuItem
                  selected
                  key={course.id}
                  onClick={() => this.selectCourse(course)}
                >
                  {course.name}
                </MenuItem>
              ) : (
                <MenuItem
                  key={course.id}
                  onClick={() => this.selectCourse(course)}
                >
                  {course.name}
                </MenuItem>
              )
          )}
        </MenuList>
      </Drawer>
    );
  }
}

const mapStateToProps = state => {
  return { selectedCourseId: state.selectedCourseId };
};

const styledSidebar = withStyles(styles)(Sidebar);
export default withRouter(
  connect(
    mapStateToProps,
    { changeCourse }
  )(styledSidebar)
);
