import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";

import { changeCourse } from "../redux/actions/courseActions";

const styles = theme => ({
  drawer: {
    width: 200,
    flexShrink: 0
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 180
  },
  nested: {
    marginLeft: "10px",
    marginBottom: "10px"
  },
  icon: {
    margin: theme.spacing.unit / 2
  }
});

class Sidebar extends React.Component {
  selectCourse = course => {
    this.props.changeCourse(course.id, this.props.history.push);
  };

  render() {
    const { user, selectedCourseId, classes } = this.props;
    return (
      <Drawer
        id="sidebar"
        variant="permanent"
        position="fixed"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.toolbar} />
        {user.person.teacher ? (
          <MenuList component="div">
            {user.person.teacher.courses.map(
              course =>
                course.id === selectedCourseId ? (
                  <div key={course.id}>
                    <MenuItem
                      selected
                      onClick={() => this.selectCourse(course)}
                    >
                      <ListItemText primary={`${course.name}`} />
                    </MenuItem>
                    <Button
                      color="primary"
                      className={classes.nested}
                      onClick={() =>
                        this.props.history.push(
                          `/course/${course.id}/assignment/create`
                        )
                      }
                    >
                      <Icon className={classes.icon} color="primary">
                        add_circle
                      </Icon>
                      Assignment
                    </Button>
                    <Divider />
                  </div>
                ) : (
                  <div key={course.id}>
                    <MenuItem onClick={() => this.selectCourse(course)}>
                      {course.name}
                    </MenuItem>
                    <Button
                      color="primary"
                      className={classes.nested}
                      onClick={() =>
                        this.props.history.push(
                          `/course/${course.id}/assignment/create`
                        )
                      }
                    >
                      <Icon className={classes.icon} color="primary">
                        add_circle
                      </Icon>
                      Assignment
                    </Button>
                    <Divider />
                  </div>
                )
            )}
          </MenuList>
        ) : (
          <MenuList>
            {user.person.student.courses.map(
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
        )}
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

export { Sidebar };
