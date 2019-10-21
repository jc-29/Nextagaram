import React from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import LoadingIndicator from "../components/LoadingIndicator";
import { Route, Link, Switch, useParams, Redirect } from "react-router-dom";
import pencil from "../pencil-edit-button.svg";

class MyProfilePage extends React.Component {
  state = {
    images: [],
    users: [],
    isLoaing: true
  };

  componentDidMount() {
    console.log(this.props.loggedIn);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    };
    axios
      .get(`https://insta.nextacademy.com/api/v1/images/me`, {
        headers: headers
      })
      .then(result => {
        console.log(result);
        this.setState({
          images: result.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let myData = JSON.parse(localStorage.getItem("userData"));
    const { images, isLoading } = this.state;
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    } else {
      if (isLoading) {
        return <LoadingIndicator />;
      }
    }
    return (
      <>
        <div id="myProfile">
          <img id="profileImage" src={myData.profile_picture} />

          <h3 id="username">@{myData.username}</h3>
          <Link to="/uploadpage" />
        </div>
        <div id="myImagesBox">
          {images.map(x => {
            return <img id="myImages" src={x} />;
          })}
        </div>
      </>
    );
  }
}
export default MyProfilePage;
