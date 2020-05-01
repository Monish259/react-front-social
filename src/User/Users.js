import React,{Component} from 'react';
import {list} from './apiUser';
import avatar from '../images/avatar.png'; 
import {Link} from 'react-router-dom';

class Users extends Component{

    constructor(props){
        super(props);
        this.state = {
            users : [],//creating empty array of users to sotr what we get from backend in this
            loading : false
        };
    }

    componentDidMount(){        // no need to write function keyword in modern js
        this.setState({loading : true});
        list()
        .then( (data) => {
            if(data.error) console.log("ERROR!!");
            else this.setState({ users : data , loading : false });
        })
    }

    renderUsers = (users) => {
       return (
        <div className = 'row'>
                {users.map( (user,i) => { // callback function inside map function taking value and index parameter to loop through users in array
                return (
                <div className="card col-sm-3 mr-4 mt-4 mb-4 ml-4" key = {i}>
                   <img className="img-thumbnail" style ={{ width:'auto' , height:'200px' , objectFit:'cover' }} src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`}
                   onError = { (photo) => {return photo.target.src = `${avatar}`} } alt={`${user.name}`}/>
                   <div className="card-body">
                     <h5 className="card-title">{user.name}</h5>
                     <p className="card-text">{user.email}</p>
                     <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary btn-sm">view profile</Link>
                   </div>
                </div>
                )})}
        </div>
       );
    }

    render(){
        const {users,loading} = this.state;
        return(
            <div className='container'>

                {loading ?
                (   <div className = 'jumbotron text-center'>
                        <h2>Loading</h2>
                    </div>
                ) : 
                    ("")
                } 

                <h2 className = 'mt-5 mb-5'>Users</h2>
                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;