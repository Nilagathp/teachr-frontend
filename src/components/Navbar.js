import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu>
      <Menu.Item as={NavLink} to="/" exact>
        <h1>Mod5Project</h1>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
