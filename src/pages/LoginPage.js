import React from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Route, Link, Switch, useParams, Redirect } from "react-router-dom";

class LoginPage extends React.Component {
  state = {
    isLogin: false
  };

  loginState = () => {
    this.setState({
      isLogin: !this.state.isLogin
    });
  };

  render() {
    const { isLogin } = this.state;
    if (this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div id="formContainer">
        <h1 id="loginTitle">N e x t a g r a m</h1>
        {!isLogin ? (
          <LoginForm
            loginState={this.loginState}
            logInUser={this.props.logInUser}
            loggedIn={this.props.loggedIn}
          />
        ) : (
          <SignUpForm
            loginState={this.loginState}
            signUpUser={this.props.signUpUser}
            newprops={this.props}
            currentUser={this.props.currentUser}
          />
        )}
      </div>
    );
  }
}
export default LoginPage;
