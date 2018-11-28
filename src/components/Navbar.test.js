import React from "react";
import { shallow } from "enzyme";

import { Navbar } from "./Navbar";

const person = { teacher: { name: "Test Teacher" } };
const classes = {
  appBar: {
    root: {
      display: "flex"
    }
  }
};

describe("Navbar", () => {
  it("renders correctly", () => {
    let wrapper = shallow(<Navbar person={person} classes={classes} />);
    expect(wrapper.find("#navbar").length).toEqual(1);
  });
  it("matches its snapshot", () => {
    let wrapper = shallow(<Navbar person={person} classes={classes} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("displays teacher's name when user is a teacher", () => {
    const component = shallow(<Navbar classes={classes} person={person} />);
    expect(component).toMatchSnapshot();
  });
});
