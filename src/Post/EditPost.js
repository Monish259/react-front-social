import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import postImage from "../images/postImage.jpg";
import { getSinglePost, updatePost } from "./apiPost";

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      id: "", //need to create state like this when using handleChange function for controlled form
      title: "",
      body: "",
      redirectToHome: false,
      loading: false,
      fileSize: 0,
    };
  }

  init = (postId) => {
    const token = isAuthenticated().token;
    getSinglePost(postId, token).then((data) => {
      if (data.error) this.setState({ redirectToHome: true });
      //if error in data then user is not authenticated and need to redirect it to signin page
      else {
        this.setState({
          id: data._id,
          title: data.title,
          body: data.body,
          error: "",
        });
      }
    });
  };

  componentDidMount() {
    //after component mounts on browser after that all operations are occured
    //  console.log('user_id : ',this.props.match.params.userId);
    this.postData = new FormData(); //used to send request as multipart/form-data to backend
    const postId = this.props.match.params.postId; //this id is that which get passed in MainRouter component from Menu Component.
    this.init(postId);
  }

  //used for making controlled component
  handleChange = (name) => (event) => {
    //event is trigerrred when onchange event runs and value is parameter for handle change function and it keeps on changing depending on i/p
    this.setState({ error: "" }); //everytime there is any change in input field errors will be cleared
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0; //getting filesize of uploaded photo

    this.postData.set(name, value); //setting value of field equal to value required
    this.setState({ [name]: value, fileSize }); //using array syntax so that it dynamically changes value depending on event occuring on which input tag
  };

  isValid() {
    //check for errors if any whil eupdating user

    const { title, body, fileSize } = this.state;

    if (fileSize > 100000) {
      //this size is in bytes
      this.setState({
        error: "File Size should be less than 100kb",
        loading: false,
      });
      return false;
    }

    if (title.length === 0 || title.length < 4) {
      this.setState({
        error: "title is required of minimum length of 4",
        loading: false,
      });
      return false;
    }

    if (body.length === 0 || body.length < 4) {
      //check email domain with given regex
      this.setState({
        error: "body is required of minimum length of 4",
        loading: false,
      });
      return false;
    }

    return true;
  }

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;

    if (this.isValid()) {
      updatePost(postId, token, this.postData).then((data) => {
        if (data.error) this.setState({ error: data.error, loading: false });
        else this.setState({ redirectToHome: true, loading: false });
      });
    }
  };

  editPostForm(id, title, body, loading, photoUrl, error) {
    //edit form also takes image and accepts every type of image

    if (loading)
      return (
        <div className="jumbotron text-center">
          <h2>
            <i className="fa fa-spinner fa-spin" /> Loading
          </h2>
        </div>
      );

    return (
      //accept property of image only shows images when trying to select one
      <form>
        <img
          className="img-thumbnail mb-5"
          style={{ width: "auto", height: "200px", objectFit: "cover" }}
          src={photoUrl}
          onError={(photo) => {
            return (photo.target.src = `${postImage}`);
          }}
          alt={`${title}`}
        />
        <div
          className="alert alert-warning"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <div className="form-group">
          <label className="text-muted">Post Photo</label>
          <input
            onChange={this.handleChange("photo")}
            type="file"
            accept="image/*"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            value={title}
            onChange={this.handleChange("title")}
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Body</label>
          <textarea
            value={body}
            onChange={this.handleChange("body")}
            type="text"
            className="form-control"
          />
        </div>

        <div className="d-inline-block">
          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
          >
            Update Post
          </button>
          <Link to={`/`} className="btn btn-raised btn-primary ml-5">
            Cancel
          </Link>
        </div>
      </form>
    );
  }

  render() {
    const { id, title, body, error, redirectToHome, loading } = this.state;

    if (redirectToHome) return <Redirect to={`/`} />;

    const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URL
        }/post/photo/${id}?${new Date().getTime()}`
      : postImage;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Post</h2>
        {this.editPostForm(id, title, body, loading, photoUrl, error)}
      </div>
    );
  }
}

export default EditPost;
