import React from "react";
import axios from "axios";
import UserImages from "../containers/UserImages";
import LoadingIndicator from "../components/LoadingIndicator";
import { Route, Link, Switch, withRouter, Redirect } from "react-router-dom";

class Homepage extends React.Component {
  state = {
    users: [],
    isLoading: true
  };

  componentDidMount() {
    axios
      .get("https://insta.nextacademy.com/api/v1/users")
      .then(result => {
        this.setState({
          users: result.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }

  render() {
    const { users, isLoading } = this.state;

    if (isLoading) {
      return <LoadingIndicator />;
    }
    return (
      <div>
        <ul>
          {users.map(user => (
            <li key={user.id} className="border">
              <div key="profile-wrapper" id="profile-wrapper">
                <div key="profile-image-box" id="profile-image-box">
                  <Link
                    name={user.id}
                    id="usernameOnHomepage"
                    to={`/user/${user.id}`}
                  >
                    @{user.username}
                  </Link>
                  <img id="profile-image" src={user.profileImage} />
                </div>
                <div
                  key="outer-user-image-container"
                  id="outer-user-image-container"
                >
                  <UserImages userID={user.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Homepage;
