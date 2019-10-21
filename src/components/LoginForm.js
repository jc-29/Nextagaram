import React from "react";

class LoginHandler extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
    console.log(this.state.username, this.state.password);
  };

  handleSubmitLogin = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.logInUser(username, password);
  };
  render() {
    const { username, password } = this.state;
    return (
      <div className="loginFormContainer">
        <h1 className="formTypeName">Log In</h1>
        <form className="formContainer" onSubmit={this.handleSubmitLogin}>
          <input
            className="allInputs"
            type="text"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={event =>
              this.handleChange(event.target.name, event.target.value)
            }
          />

          <input
            className="allInputs"
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={event =>
              this.handleChange(event.target.name, event.target.value)
            }
          />
          <input
            className="allInputs btn-secondary"
            type="submit"
            name="submitButton"
            disabled={username == "" || password == "" ? true : false}
          />
        </form>
        <button
          className="btn btn-link switchForms"
          onClick={this.props.loginState}
        >
          Not yet registered? Sign up now!
        </button>
      </div>
    );
  }
}
export default LoginHandler;
