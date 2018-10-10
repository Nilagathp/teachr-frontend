import React from "react";
import { Button, Input, Form, Container } from "semantic-ui-react";

class LogIn extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const url = "http://localhost:3000/login";
    const params = {
      email: this.state.email,
      password: this.state.password
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ user: params }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(response => {
        localStorage.setItem("token", response.jwt);
      });
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <h2>Log In</h2>
          <Form.Field inline>
            <label>Email</label>
            <Input
              width={8}
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field inline>
            <label>Password</label>
            <Input
              width={8}
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit">Log In</Button>
        </Form>
      </Container>
    );
  }
}

export default LogIn;
