import React, { Component } from "react";
import { findPeople, clickFollow } from "./apiUser";
import avatar from "../images/avatar.png";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

class FindPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [], //creating empty array of users to store what we get from backend in this
      error: "",
      loading: false,
    };
  }

  Follow(person, i) {
    // console.log("AUTOMATICALLY TRIGGERING !!!!");
    
    this.setState({ loading: true });
    const token = isAuthenticated().token;
    const userId = isAuthenticated().user._id;
    const followId = person._id;

    clickFollow(userId, followId, token).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else {
        //remove newly followed user from updated user list now
        let toFollow = this.state.users;
        toFollow.splice(i, 1); //newly followed user is at index i which is now removed from users array to update findPeople page
        this.setState({
          users: toFollow,
          loading: false,
        });
      }
    });
  }

  componentDidMount() {
    // no need to write function keyword in modern js
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    findPeople(userId, token).then((data) => {
      if (data.error) console.log(data.error);
      else this.setState({ users: data });
    });
  }

  renderUsers = (users) => {
    const { loading } = this.state;
    return (
      <div className="row">
        {users.map((user, i) => {
          // callback function inside map function taking value and index parameter to loop through users in array
          return (
            <div className="card col-sm-3 mr-4 mt-4 mb-4 ml-4" key={i}>
              <img
                className="img-thumbnail"
                style={{ width: "auto", height: "200px", objectFit: "cover" }}
                src={`${process.env.REACT_APP_API_URL}/user/photo/${
                  user._id
                }?${new Date().getTime()}`}
                onError={(photo) => {
                  return (photo.target.src = `${avatar}`);
                }}
                alt={`${user.name}`}
              />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <Link
                  to={`/user/${user._id}`}
                  className="btn btn-raised btn-primary btn-sm"
                >
                  view profile
                </Link>
                    {
                        loading ? (
                            <button
                            className="btn btn-raised btn-info btn-sm float-right"
                          >
                            Follow
                          </button>
                        ) : 
                        (
                            <button
                            onClick={() => this.Follow(user, i)}
                            className="btn btn-raised btn-info btn-sm float-right"
                          >
                            Follow
                          </button>
                        )
                    }
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Find People</h2>
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default FindPeople;
