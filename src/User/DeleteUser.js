import React,{Component} from 'react';
import {isAuthenticated,signout} from  '../auth';
import {remove} from './apiUser';
import {deleteAllPosts} from '../Post/apiPost';
import {Redirect} from 'react-router-dom';
 
class DeleteUser extends Component{

    constructor(props){
        super(props);
        this.state = {
            redirectToSignin : false
        };
    }

    deleteConfirmed = (userId,token) => {
        this.deletePosts(userId,token);
        remove(userId,token)
        .then( (data)=> {
            if(data.error) console.log("ERROR");
            else {  
                    signout( () => console.log("Account deleted") )
                    this.setState({ redirectToSignin : true });
            }
        });
    }

    deletePosts(userId,token){
        
        deleteAllPosts(userId,token)
        .then( (data) => {
            if(data.error) console.log(data.error);
            else {console.log(data);}
        });

    };

    confirmDelete = () => { //userId passed in component form profile.js file is present in props here
        let sure = window.confirm("Are you sure you want to delete your account...");
        if(sure) {
            const token = isAuthenticated().token;
            const userId = isAuthenticated().user._id;
            this.deleteConfirmed(userId,token);
        }
    };

    render(){
        const {redirectToSignin} = this.state;
        if(redirectToSignin) return <Redirect to ='/signin' />
        return (
            <button onClick = {this.confirmDelete} className = 'btn btn-raised btn-danger'>Delete Profile</button>
        );
    }
}

export default DeleteUser;