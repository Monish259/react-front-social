import React, { Component } from "react";
import { forgotPassword } from "../auth";
import { Link } from "react-router-dom";

class ForgotPassword extends Component {
  state = {
    email: "",
    msg: "",
    error: "",
  };

  handleChange = (value) => (event) => {
    this.setState({ [value]: event.target.value, msg: "", error: "" });
  };

  clickSubmit = (e) => {
    e.preventDefault();
    forgotPassword(this.state.email).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else this.setState({ msg: data.message, email: "" });
    });
  };

  render() {
    const { email, msg, error } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Recover your account</h2>
        {msg && <h4 className="bg-success">{msg}</h4>}
        {error && <h4 className="bg-warning">{error}</h4>}

        <form>
          <div className="form-group mt-5">
            <label className="text-muted">Email</label>
            <input
              value={email}
              onChange={this.handleChange("email")}
              type="email"
              className="form-control"
              required
            />
          </div>

          <div className="d-inline-block mt-4">
            <button
              onClick={this.clickSubmit}
              className="btn btn-raised btn-primary"
            >
              Submit
            </button>
            <Link to={`/signin`} className="btn btn-raised btn-warning ml-5">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
