import React from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText
} from "reactstrap";

class SignUpForm extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  handleChange = event => {
    let x = { ...event };
    let delay = setTimeout(() => this.handleUsernameCheck(x), 0);
    this.setState({
      [event.target.name]: event.target.value,
      delay
    });
  };
  handleUsernameCheck = event => {
    let newUsername = "";
    if (event.target.name == "username") {
      newUsername = event.target.value;
      if (newUsername.length >= 6) {
        axios
          .get(
            `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
          )
          .then(result => {
            if (result.data.valid) {
              this.setState({
                usernameValidity: true
              });
            } else {
              this.setState({
                usernameValidity: false
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };

  handleSubmitSignUp = event => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = this.state;

    if (password == confirmPassword && password.length >= 8) {
      if (this.state.usernameValidity) {
        console.log("hi");
        this.props.signUpUser(username, email, password);
      }
    }

    console.log(
      `username: ${this.state.username}, email:${this.state.email}, password: ${this.state.password}, confirmPassword: ${this.state.confirmPassword}`
    );
  };

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      usernameValidity
    } = this.state;
    return (
      <>
        <form id="submitFormContainer" onSubmit={this.handleSubmitSignUp}>
          <h1>Sign Up</h1>
          <FormGroup id="usernameSignup">
            <FormText
              className="removeMarginTop"
              style={{ textColor: "black" }}
            >
              username has to be at least 6 characters long:
            </FormText>

            <Input
              id="usernameInput"
              className="removeMargin consistentInputLength"
              type="text"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={event => {
                if (this.state.delay) {
                  clearTimeout(this.state.delay);
                }
                this.handleChange(event);
              }}
              {...(username.length >= 6
                ? usernameValidity
                  ? { valid: true }
                  : { invalid: true }
                : username.length > 0
                ? { invalid: true }
                : "")}
            />
            <FormFeedback
              {...(username.length >= 6 && usernameValidity
                ? { valid: true }
                : { invalid: true })}
            >
              {username.length >= 6 && username.length > 0 && usernameValidity
                ? "This username works!"
                : "This username is invalid!"}
            </FormFeedback>
          </FormGroup>
          <FormGroup id="emailSignup">
            <Input
              className="removeMargin consistentInputLength"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={event => this.handleChange(event)}
            />
          </FormGroup>
          <FormGroup id="passwordSignup">
            <FormText id="formTextPassword" className="removeMarginTop">
              password has to be at least 8 characters long:
            </FormText>

            <Input
              className="removeMargin consistentInputLength"
              type="password"
              name="password"
              placeholder="Create password"
              value={password}
              onChange={event => this.handleChange(event)}
              {...(password.length == 0
                ? ""
                : password.length >= 8
                ? { valid: true }
                : { invalid: true })}
            />
            <FormFeedback
              {...(password.length >= 8 ? { valid: true } : { invalid: true })}
            >
              {password.length >= 8
                ? "This password works!"
                : "This password is invalid!"}
            </FormFeedback>
          </FormGroup>
          <FormGroup id="confirmPasswordSignup">
            <Input
              className="consistentInputLength"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={event => this.handleChange(event)}
              {...(confirmPassword.length == 0
                ? ""
                : confirmPassword == password
                ? { valid: true }
                : { invalid: true })}
            />
            <FormFeedback
              {...(password == confirmPassword
                ? { valid: true }
                : { invalid: true })}
            >
              {password == confirmPassword
                ? "Passwords match"
                : "Passwords don't match"}
            </FormFeedback>
          </FormGroup>
          <input
            type="submit"
            name="submitButton"
            className="allInputs btn-secondary"
            disabled={
              usernameValidity &&
              password.length >= 8 &&
              password == confirmPassword
                ? false
                : true
            }
          />
          <button
            className="btn btn-link switchForms"
            onClick={this.props.loginState}
          >
            Already registered? Log in now!
          </button>
        </form>
      </>
      // <div className="loginFormContainer">
      //   <h1 className="formTypeName">Sign Up</h1>
      //   <form className="formContainer" onSubmit={this.handleSubmitSignUp}>

      //     <input
      //       className="allInputs"
      //       type="text"
      //       name="username"
      //       placeholder="Enter username"
      //       value={username}
      //       onChange={event => this.handleChange(event)}
      //     />
      //     <input
      //       className="allInputs"
      //       type="text"
      //       name="email"
      //       placeholder="Enter email"
      //       value={email}
      //       onChange={event => this.handleChange(event)}
      //     />

      //     <input
      //       className="allInputs"
      //       type="password"
      //       name="password"
      //       placeholder="Enter password"
      //       value={password}
      //       onChange={event => this.handleChange(event)}
      //     />
      //     <input
      //       className="allInputs"
      //       type="password"
      //       name="confirmPassword"
      //       placeholder="Confirm password"
      //       value={confirmPassword}
      //       onChange={event => this.handleChange(event)}
      //     />

      //   </form>
      // <button
      //   className="btn btn-link switchForms"
      //   onClick={this.props.loginState}
      // >
      //   Already registered? Log in now!
      // </button>
      // </div>
    );
  }
}
export default SignUpForm;
