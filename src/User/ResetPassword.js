import React, { Component } from "react";
import { resetPassword } from "../auth";
import { Redirect } from "react-router-dom";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            newPasswordVerify : "",
            message: "",
            error: "",
            redirectToSignin : false
        };
    }

    handleChange = (value) => (event) => {
        this.setState({ [value] : event.target.value,message :"",error : "" });
    };

    isValid(){  //check for errors if any while updating user

        const {newPassword,newPasswordVerify} = this.state;

        if(!newPassword) {
            this.setState({ error : "New Password cannot be empty" });
            return false;
        }
       
        if(!newPasswordVerify) {
            this.setState({ error : "Verify New Password cannot be empty" });
            return false;
        }

        if(newPassword !== newPasswordVerify) {
            this.setState({ error : "New Password and Verify New Password must be same!!" });
            return false;
        }

        return true;

    }

    resetPassword = (event) => {
        event.preventDefault();
        this.setState({ message: "", error: "" });

        if (this.isValid()) {
          resetPassword(this.state.newPassword,this.props.match.params.resetPasswordToken)
          .then((data) => {
            if (data.error) {
              console.log(data.error);
              this.setState({ error: data.error });
            } else {
              console.log(data.message);
              this.setState({ message: data.message, newPassword: "" ,newPasswordVerify:"" ,redirectToSignin : true});
            }
          });
        }
    };

    render() {
      if(this.state.redirectToSignin) return <Redirect to = '/' />

        return (
          <div className="container">
            <h2 className="mt-5 mb-5">Reset your Password</h2>

            {this.state.message && (
              <h4 className="bg-success">{this.state.message}</h4>
            )}
            {this.state.error && (
              <h4 className="bg-warning">{this.state.error}</h4>
            )}

            <form>
              <div className="form-group mt-5">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Your new password"
                  value={this.state.newPassword}
                  name="newPassword"
                  onChange={this.handleChange("newPassword")}
                  autoFocus
                />
              </div>
              <div className="form-group mt-5">
                <label className="text-muted">Verfiy new Password</label>
                <input
                  value={this.state.newPasswordVerify}
                  onChange={this.handleChange("newPasswordVerify")}
                  type="password"
                  className="form-control"
                  required
                />
              </div>

              <button
                onClick={this.resetPassword}
                className="btn btn-raised btn-primary"
              >
                Reset Password
              </button>
            </form>
          </div>
        );
    }
}

export default ResetPassword;