import React from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

class UserProfile extends React.Component {
  state = {
    userImages: [],
    users: []
  };
  componentDidMount() {
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/images?userId=${this.props.match.params.id}`
      )
      .then(result => {
        console.log(result);
        this.setState({
          userImages: [...result.data]
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`https://insta.nextacademy.com/api/v1/users`)
      .then(result => {
        console.log(result);
        this.setState({
          users: result.data
        });
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }

  render() {
    const { userImages, users } = this.state;
    return (
      <>
        <div id="personalBox">
          {users.map(y => (
            <div id="personalBio">
              {y.id == this.props.match.params.id ? (
                <img id="personalProfilePic" src={y.profileImage} />
              ) : null}
              {y.id == this.props.match.params.id ? (
                <p id="personalUsername">@{y.username}</p>
              ) : null}
            </div>
          ))}
          <div id="personalImagesBox">
            {userImages.map(x => (
              <img src={x} alt="userImage" key={x} id="personalPics" />
            ))}{" "}
          </div>
        </div>
      </>
    );
  }
}

export default UserProfile;
