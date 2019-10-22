import React from "react";
import { Redirect } from "react-router-dom";
import { FormGroup, FormText, Button } from "reactstrap";
import axios from "axios";
import uploadImage from "../upload.svg";
import loader from "../Rolling-1s-200px.gif";

class UploadPage extends React.Component {
  state = {
    imageFile: null,
    previewImage: null,
    message: "",
    loading: false
  };

  handleFile = event => {
    console.log(event.target.files[0]);
    this.setState({
      imageFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0])
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let jwt = localStorage.getItem("jwt");
    let formData = new FormData();
    formData.append("image", this.state.imageFile);
    this.setState({
      loading: true
    });
    axios
      .post("https://insta.nextacademy.com/api/v1/images/", formData, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      .then(response => {
        console.log(response);
        if (response.data.success) {
          this.setState({
            message: "Image Uploaded Successfully!",
            previewImage: "",
            imageFile: null,
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false
        });
      });
  };
  render() {
    const { imageFile, previewImage, message, loading } = this.state;
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div id="previewContainer">
          <h3 className="text=center" id="textContainer">
            {message ? message : "Upload an Image"}
          </h3>
        </div>
        <form id="uploadForm" onSubmit={event => this.handleSubmit(event)}>
          <FormGroup id="uploadFormGroup">
            <input
              id="imageSelector"
              type="file"
              name="image-file"
              multiple="false"
              onChange={event => {
                this.handleFile(event);
              }}
            ></input>
            <label for="imageSelector">
              {previewImage ? (
                <img
                  id="imagePreview"
                  src={previewImage}
                  width="50%"
                  height="80%"
                />
              ) : (
                <>
                  <img id="uploadBackground" src={uploadImage} />
                  <p>Click to choose a file...</p>
                </>
              )}
            </label>
            <FormText color="muted">
              Make sure the image being uploaded is a supported format.
            </FormText>
          </FormGroup>
          <Button
            type="submit"
            color="primary"
            id="uploadButton"
            disabled={imageFile ? false : true}
          >
            {loading ? <img id="uploadLoader" src={loader} /> : "Upload"}
          </Button>
        </form>
      </div>
    );
  }
}

export default UploadPage;
