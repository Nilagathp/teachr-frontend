import React from "react";
import { shallow } from "enzyme";

import { Sidebar } from "./Sidebar";

const user = {
  role: "teacher",
  person: {
    teacher: {
      name: "Test Teacher",
      courses: [{ name: "Test Course 1" }, { name: "Test Course 2" }]
    }
  }
};
const classes = {
  drawer: {
    width: 200,
    flexShrink: 0
  },
  toolbar: 10,
  drawerPaper: {
    width: 180
  },
  nested: {
    marginLeft: "10px",
    marginBottom: "10px"
  },
  icon: {
    margin: 5
  }
};

describe("Sidebar", () => {
  it("renders correctly", () => {
    let wrapper = shallow(<Sidebar user={user} classes={classes} />);
    expect(wrapper.find("#sidebar").length).toEqual(1);
  });
  it("matches its snapshot", () => {
    let wrapper = shallow(<Sidebar user={user} classes={classes} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("displays course names when user is a teacher", () => {
    const component = shallow(<Sidebar user={user} classes={classes} />);
    expect(component).toMatchSnapshot();
  });
});
