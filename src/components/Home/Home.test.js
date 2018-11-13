import React from "react";
import { shallow } from "enzyme";

import { Home } from "./Home";

// let posts = [
//   { data: { id: 1, title: "post1", author: "me" } },
//   { data: { id: 2, title: "post2", author: "you" } },
//   { data: { id: 3, title: "post3", author: "bob" } }
// ];

describe("Home", () => {
  it("renders correctly", () => {
    let wrapper = shallow(<Home />);
    expect(wrapper.find(".home").length).toEqual(1);
  });
  it("matches its snapshot", () => {
    let wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});
