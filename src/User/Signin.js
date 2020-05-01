import React, { Component } from "react";
import {Link ,Redirect} from 'react-router-dom';
import {signin,authenticate} from '../auth';
import SocialLogin from "./SocialLogin";

class Signin extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            error : "",
            redirect : false
        };
    }
    //used for making controlled component 
    handleChange = (value) => (event) => { //event is trigerrred when onchange event runs and value is parameter for handle change function and it keeps on changing depending on i/p
        this.setState({ error : "" });
        this.setState({ [value] : event.target.value });//using array syntax so that it dynamically changes value depending on event occuring on which input tag 
    } 

    clickSubmit = (event) => {
        event.preventDefault();
        const {email,password} = this.state; //getting data from state
        const user = {          //creating object to hold data form state to send to backend
            email : email,
            password : password
        }
            //console.log(user);
            signin(user)
            .then( (data) => {
                if(data.error) this.setState({
                    error : data.error,
                    password : "" 
                    });
                else{
                    authenticate(data);
                    this.setState({ redirect : true });
                }
            });
    }

    render(){       //using this as an controlled component as each value change is being monitored
        const {email,password,error,redirect} = this.state;//use {{}} to write css in react as in line 61

        if(redirect) return <Redirect to = "/" /> //redirecting user to home after correct credentials are entered

        return (
          <div className="container">
            <h2 className="mt-5 mb-5">Signin</h2>
            <hr />
            <SocialLogin />
            <hr />
            <div
              className="alert alert-warning"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </div>

            <form>
              <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                  value={email}
                  onChange={this.handleChange("email")}
                  type="email"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                  value={password}
                  onChange={this.handleChange("password")}
                  type="password"
                  className="form-control"
                />
              </div>
              <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
              >
                Submit
              </button>
              <p className="mt-3">
                <Link
                  to="/forgot-password"
                  className="btn btn-raised btn-warning"
                >
                  Forgot Password
                </Link>
              </p>
            </form>
          </div>
        );
    }

}

export default Signin;