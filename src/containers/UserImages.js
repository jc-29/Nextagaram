import React from "react";
import "../App.css";
import axios from "axios";
import Placeholder from "../components/placeholder";
import userImageLoader from "../Pacman-1s-200px.gif";

class UserImages extends React.Component {
  state = {
    imageLoading: true,
    images: []
  };

  componentDidMount() {
    // performing a GET request
    axios
      .get(
        `https://insta.nextacademy.com//api/v1/images?userId=${this.props.userID}`
      )
      .then(result => {
        this.setState({
          images: result.data,
          imageLoading: false
        });
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }

  render() {
    const { imageLoading, images } = this.state;
    if (imageLoading) {
      return (
        <div id='userImageLoaderContainer'>
          <img src={userImageLoader} />
        </div>
      );
    }
    return images.map(img => <Placeholder path={img} />);
  }
}

export default UserImages;
