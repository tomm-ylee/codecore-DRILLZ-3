import React, { Component } from "react";
import { User } from "../lib/requests";
import { Container, Divider, Form, Input, Button, Icon } from "semantic-ui-react";
import "bootstrap/dist/css/bootstrap.css";
// import {User} from '../lib/requests';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  handleSubmit(event) {
    const { onSignUp = () => {} } = this.props;
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    User.create({
      user: {
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        password: formData.get("password"),
        password_confirmation: formData.get("password_confirmation")
      }
    }).then(data => {
      if (!data.errors) {
        const jwt = data.jwt;
        localStorage.setItem("jwt", jwt);
        onSignUp();
        this.props.history.push("/quizzes");
      }
    });
  }
  render() {
    return (

      <div className="SignUpPage">
        <Container textAlign="center" className="homepage-container mt-3">
          <Icon name="setting" size="huge" color="red" className="m-5" />
          <Icon name="checkmark" size="huge" color="red" className="m-5" />
          <Icon
            name="location arrow"
            size="huge"
            color="red"
            className="m-5"
          />
        </Container>
        <Divider />
        <Container>


              <input
                placeholder="Last Name"
                id="form-imput-control-last-name"
                type="text"
                name="last_name"
              />
            </Form.Field>
      
          </Form.Group>

            <Form.Field>
              <label>Email</label>
              <input
                placeholder="Email"
                id="form-imput-control-email"
                type="email"
                name="email"
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Password</label>
                <input
                  placeholder="Password"
                  id="form-imput-control-password"
                  type="password"
                  name="password"
                />
              </Form.Field>
              <Form.Field>
                <label>Password Confirmation</label>
                <input
                  placeholder="Password Confirmation"
                  id="form-imput-control-password-confirmation"
                  type="password"
                  name="password_confirmation"
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <Button
                id="form-button-control-public"
                type="submit"
                content="Create Account"
              />
            </Form.Field>

          </Form.Group>
      
          <Form.Field>
            <Button
              id="form-button-control-public"
              type="submit"
              content="Create Account"
            />
          </Form.Field>
      
        </Form>{" "}
      </div>
    );
  }
}

export default SignUpPage;

{
  /* <Form onSubmit={this.handleSubmit}>
  <Form.Group widths="equal">
    <Form.Field
      id="form-input-control-first-name"
      control={Input}
      label="First name"
      placeholder="First name"
    />
    <Form.Field
      id="form-imput-control-last-name"
      control={Input}
      label="Last name"
      placeholder="Last name"
    />
  </Form.Group>

  <Form.Field
    id="form-imput-control-email"
    control={Input}
    label="Email"
    placeholder="youremail@gmail.com"
  />
  <Form.Group widths="equal">
    <Form.Field
      id="form-imput-control-password"
      control={Input}
      label="Password"
      type="password"
    />
    <Form.Field
      id="form-imput-control-password-confirmation"
      control={Input}
      label="Password Confirmation"
      type="password"
    />
  </Form.Group>
  <Form.Field
    id="form-button-control-public"
    control={Button}
    content="Create Account"
  />
</Form>
 */
}
