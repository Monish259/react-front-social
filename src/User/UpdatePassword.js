import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { read, updatePassword } from "./apiUser";

class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      id: "", //need to create state like this when using handleChange function for controlled form
      currentPassword: "",
      hashed_password: "", //updated password set by user
      currentPasswordVerify: "",
      loading: false,
      redirectToProfile: false,
    };
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) this.setState({ redirectToProfile: true });
      //if error in data then user is not authenticated and need to redirect it to signin page
      else {
        //  console.log(data.user);
        this.setState({
          id: data.user._id,
          error: "",
        });
      }
    });
  };

  componentDidMount() {
    //after component mounts on browser after that all operations are occured
    // console.log('user_id : ',this.props.match.params.userId);
    const userId = this.props.match.params.userId; //this id is that which get passed in MainRouter component from Menu Component.
    this.init(userId);
  }

  //used for making controlled component
  handleChange = (name) => (event) => {
    //event is trigerrred when onchange event runs and value is parameter for handle change function and it keeps on changing depending on i/p
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value }); //using array syntax so that it dynamically changes value depending on event occuring on which input tag
  };

  isValid() {
    //check for errors if any while updating user

    const {
      currentPassword,
      currentPasswordVerify,
      hashed_password,
    } = this.state;

    if (!currentPassword) {
      this.setState({ error: "Current Password cannot be empty",loading : false });
      return false;
    }

    if (!currentPasswordVerify) {
      this.setState({ error: "Verify Current Password cannot be empty",loading : false });
      return false;
    }

    if (currentPassword !== currentPasswordVerify) {
      this.setState({
        error: "Current Password and Verify Current Password must be same!!",loading : false
      });
      return false;
    }

    if (hashed_password.length > 0) {
      if (hashed_password.length < 8) {
        this.setState({
          error: "Password must contain atleast 8 characters!!",
          loading : false
        });
        return false;
      }

      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(
          hashed_password
        )
      ) {
        this.setState({
          error:
            "Password must contain atlest 1 lowercase character , 1 uppercase character , 1 numeric character , 1 special character!!",
            loading : false
        });
        return false;
      }
    }

    return true;
  }

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const userId = this.props.match.params.userId;
    const token = isAuthenticated().token;

    const { id, name, email, hashed_password, currentPassword } = this.state; //getting data from state

    if (this.isValid()) {
      const user = {
        id: id, //creating object to hold data form state to send to backend
        name: name,
        email: email,
        currentPassword: currentPassword,
        hashed_password: hashed_password,
      };
      // console.log(user);
      updatePassword(userId, token, user).then((data) => {
        if (data.error) this.setState({ error: data.error ,loading: false});
        else {
          // console.log(data);
          this.setState({ redirectToProfile: true, loading: false });
        }
      });
    }
  };

  editForm(
    id,
    currentPassword,
    hashed_password,
    currentPasswordVerify,
    loading
  ) {
    //edit form also takes image and accepts every type of image
    return (
      //accept property of image only shows images when trying to select one
      <form>
        <div className="form-group">
          <label className="text-muted">Current Password</label>
          <input
            value={currentPassword}
            onChange={this.handleChange("currentPassword")}
            type="password"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Verfiy Current Password</label>
          <input
            value={currentPasswordVerify}
            onChange={this.handleChange("currentPasswordVerify")}
            type="password"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">
            New Password
          </label>
          <input
            value={hashed_password}
            onChange={this.handleChange("hashed_password")}
            type="password"
            className="form-control"
          />
        </div>

        <div className="d-inline-block">
          {loading ? (
            <div className="btn btn-raised btn-secondary">
              <i className="fa fa-spinner fa-spin" />
            </div>
          ) : (
            <button
              onClick={this.clickSubmit}
              className="btn btn-raised btn-primary"
            >
              Update
            </button>
          )}
          <Link to={`/user/${id}`} className="btn btn-raised btn-primary ml-5">
            Cancel
          </Link>
        </div>
      </form>
    );
  }

  render() {
    const {
      id,
      currentPassword,
      hashed_password,
      error,
      redirectToProfile,
      currentPasswordVerify,
      loading,
    } = this.state;

    if (redirectToProfile) return <Redirect to={`/user/${id}`} />;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Update Password</h2>

        <div
          className="alert alert-warning"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {this.editForm(
          id,
          currentPassword,
          hashed_password,
          currentPasswordVerify,
          loading
        )}
      </div>
    );
  }
}

export default UpdatePassword;
