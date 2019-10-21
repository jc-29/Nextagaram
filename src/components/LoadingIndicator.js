import React from "react";
import LoadingIndicatorImage from "../Rolling-1s-200px.gif";

const LoadingIndicator = props => {
  return (
    <div id="loader-container">
      <img src={LoadingIndicatorImage} />
    </div>
  );
};

export default LoadingIndicator;
