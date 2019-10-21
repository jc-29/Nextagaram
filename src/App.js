import React from "react";
import "./App.css";
import Homepage from "./pages/HomePage";
import UserProfile from "./pages/UserProfilePage";
import { Route, Link, Switch, withRouter, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import MyProfilePage from "./pages/MyProfilePage";
import Navbar from "./components/Navbar";
import UploadPage from "./pages/UploadPage";
import UploadButton from "./components/ButtonToUpload";

class App extends React.Component {
  state = {
    users: [],
    currentUser: { loggedIn: false },
    error: "",
    setAlert: false
  };

  componentDidMount() {
    console.log(this.props);
    let user = localStorage.getItem("userData");
    console.log(user);
    if (user) {
      user = JSON.parse(user);
      this.setState({
        currentUser: { ...user, loggedIn: true }
      });
    }
  }

  logoutHandler = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userData");
    this.setState({
      currentUser: { loggedIn: false }
    });
  };

  logInUser = (username, password) => {
    axios
      .post(`https://insta.nextacademy.com/api/v1/login`, {
        username: username,
        password: password
      })
      .then(result => {
        console.log(result);
        let jwt = result.data.auth_token;
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        this.setState({
          currentUser: { ...result.data.user, loggedIn: true },
          setAlert: true
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: true
        });
      });
  };
  clearError = x => {
    this.setState({
      error: x
    });
  };

  disableAlert = () => {
    this.setState({
      setAlert: false
    });
  };
  signUpUser = (username, email, password) => {
    axios
      .post("https://insta.nextacademy.com/api/v1/users/", {
        username: username,
        email: email,
        password: password
      })
      .then(result => {
        console.log(result);
        let jwt = result.data.auth_token;
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        this.setState({
          currentUser: { ...result.data.user, loggedIn: true }
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    console.log(this);
    return (
      <>
        <Navbar
          loggedIn={this.state.currentUser.loggedIn}
          logoutHandler={this.logoutHandler}
          clearError={this.clearError}
          error={this.state.error}
          setAlert={this.state.setAlert}
          disableAlert={this.disableAlert}
        />
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Homepage
                logoutHandler={this.logoutHandler}
                currentUser={this.state.currentUser}
                loggedIn={this.state.currentUser.loggedIn}
              />
            )}
          />
          <Route path="/user/:id" component={UserProfile} />

          <Route
            exact
            path="/profile"
            component={props => (
              <MyProfilePage
                loggedIn={this.state.currentUser.loggedIn}
                {...props}
              />
            )}
          />

          <Route
            path="/login"
            component={props => {
              return (
                <LoginPage
                  loggedIn={this.state.currentUser.loggedIn}
                  signUpUser={this.signUpUser}
                  {...props}
                  currentUser={this.state.currentUser}
                  logInUser={this.logInUser}
                />
              );
            }}
          />
          <Route
            path="/uploadpage"
            component={() => {
              return <UploadPage loggedIn={this.state.currentUser.loggedIn} />;
            }}
          />
        </Switch>
        {this.state.currentUser.loggedIn &&
          this.props.location.pathname != "/uploadpage" && <UploadButton />}
      </>
    );
  }
}
export default withRouter(App);
