import React from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

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

const Sidebar = ({ courses, classes }) => {
  return (
    <Drawer
      variant="permanent"
      position="fixed"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.toolbar} />
      <MenuList>
        {courses.map(course => (
          <Link
            to={`/course/${course.id}`}
            style={{ textDecoration: "none" }}
            key={course.id}
          >
            <MenuItem>{course.name}</MenuItem>
          </Link>
        ))}
      </MenuList>
    </Drawer>
  );
};

export default withStyles(styles)(Sidebar);
