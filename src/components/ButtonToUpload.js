import React from "react";
import camera from "../camera.png";
import { Route, Link, Switch, useParams, Redirect } from "react-router-dom";


const UploadButton = props => {
  return (

    <Link to="/uploadpage" id="uploadButtonContainer">
      <img id="camera-logo" src={camera} />
    </Link>
  );
};
export default UploadButton;
