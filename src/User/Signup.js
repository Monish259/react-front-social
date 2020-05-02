import React, { Component } from 'react';
import {signup} from '../auth';
import {Link} from 'react-router-dom';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : "",
            email : "",
            password : "",
            error : "",
            open : false
        };
    }
    //used for making controlled component 
    handleChange = (value) => (event) => { //event is trigerrred when onchange event runs and value is parameter for handle change function and it keeps on changing depending on i/p
        this.setState({ error : "" });
        this.setState({ [value] : event.target.value });//using array syntax so that it dynamically changes value depending on event occuring on which input tag 
    } 

    clickSubmit = (event) => {
        event.preventDefault();
        const {name,email,password} = this.state; //getting data from state
        const user = {          //creating object to hold data form state to send to backend
            name : name,
            email : email,
            password : password
        }
            // console.log(user);
            signup(user)
            .then( (data) => {
                if(data.error) this.setState({ error : data.error });
                else 
                this.setState({
                    name : "",
                    email : "",
                    password : "",
                    error : "",
                    open : true
                });
            });
    }

    render(){       //using this as an controlled component as each value change is being monitored
        const {name,email,password,error,open} = this.state;//use {{}} to write css in react as in line 61
        return (
            <div className = "container">
                <h2 className = "mt-5 mb-5">Signup</h2>

                <div className = "alert alert-warning" style = {{ display : error ? "" : "none" }}>
                    {error}
                </div>

                <div className = "alert alert-success" style = {{ display : open ? "" : "none" }}>
                    User succefully registered . Please <Link to='/signin'>login</Link> !! 
                </div>

                <form>
                    <div className = "form-group">
                        <label className = "text-muted">Name</label>
                        <input value = {name} onChange = {this.handleChange("name")} type = "text" className = "form-control"/>
                    </div>
                    <div className = "form-group">
                        <label className = "text-muted">Email</label>
                        <input value = {email} onChange = {this.handleChange("email")} type = "email" className = "form-control"/>
                    </div>
                    <div className = "form-group">
                        <label className = "text-muted">Password</label>
                        <input value = {password} onChange = {this.handleChange("password")} type = "password" className = "form-control"/>
                    </div>
                    <button onClick = {this.clickSubmit} className = "btn btn-raised btn-primary">Sign Up</button>
                </form>

            </div>
        );
    }

}

export default Signup;