import React from "react";
import Image from "react-graceful-image";




const Placeholder = props => {
    return <Image
    src={props.path}
    width="300"
    height="250"
    style={{ margin: "2px" }}
    alt="My awesome image"
    retry={{ count: 10, delay: 2 }}
  />
}

export default Placeholder;
