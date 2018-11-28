import React from "react";
import { shallow } from "enzyme";

import { Home } from "./Home";

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
