import React from "react";
import Logo from "../instagram-logo.png";
import { Button, Alert, UncontrolledAlert } from "reactstrap";
import { Link } from "react-router-dom";

class Header extends React.Component {
  onDismiss = () => {
    this.props.clearError(false);
  };

  render() {
    return (
      <>
        <div id="header">
          <Link to="/" id="homeButton">
            <img id="igLogo" src={Logo} />
            <h1 id="websiteName">Nextagaram</h1>
          </Link>

          <form
            style={this.props.loggedIn == false ? { marginLeft: "51vw" } : null}
          >
            <input id="searchBar" placeholder=" Type a username"></input>
            <Button id="searchButton" color="info">
              Search
            </Button>
          </form>

          {this.props.loggedIn == true ? (
            <div>
              <Link to="/profile" id="profileLink">
                My Profile
              </Link>
              <Link
                to="/"
                id="logoutLinkButton"
                onClick={this.props.logoutHandler}
              >
                Log Out
              </Link>
            </div>
          ) : (
            <Link to="/login" id="loginLinkButton">
              Log In
            </Link>
          )}
        </div>

        {this.props.loggedIn && (
          <UncontrolledAlert
            color="success"
            isOpen={this.props.setAlert}
            toggle={this.props.disableAlert}
          >
            Successful Login!
          </UncontrolledAlert>
        )}
        {this.props.error ? (
          <Alert
            color="danger"
            isOpen={this.props.error}
            toggle={this.onDismiss}
          >
            Invalid Login!
          </Alert>
        ) : null}
      </>
    );
  }
}

export default Header;
