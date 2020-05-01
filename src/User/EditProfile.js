import React,{Component} from 'react';
import {read,update,updateUserName} from './apiUser';
import {isAuthenticated} from '../auth';
import { Link ,Redirect } from 'react-router-dom';
import avatar from '../images/avatar.png'; 

class EditProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            error : "",
            id : "",    //need to create state like this when using handleChange function for controlled form
            name : "",
            email : "",
            about : "",
            redirectToProfile : false,
            loading : false,
            fileSize : 0
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId,token).then( (data) => 
        {
            if(data.error) this.setState( {redirectToProfile : true} ); //if error in data then user is not authenticated and need to redirect it to signin page
            else {
               // console.log(data.user);
                this.setState({ 
                    id : data.user._id,
                    name : data.user.name,
                    email : data.user.email,
                    about : data.user.about,
                    error : ""
                });  
            }
        } 
        ) 
    }

    componentDidMount(){ //after component mounts on browser after that all operations are occured
      //  console.log('user_id : ',this.props.match.params.userId);
        this.userData = new FormData(); //used to send request as multipart/form-data to backend
        const userId = this.props.match.params.userId; //this id is that which get passed in MainRouter component from Menu Component.
        this.init(userId);
    }

        //used for making controlled component 
    handleChange = (name) => (event) => { //event is trigerrred when onchange event runs and value is parameter for handle change function and it keeps on changing depending on i/p
        this.setState({ error : "" });  //everytime there is any change in input field errors will be cleared
        const value = name === 'photo' ? event.target.files[0] : event.target.value;

        const fileSize = name ==='photo' ? event.target.files[0].size : 0; //getting filesize of uploaded photo
        
        this.userData.set(name , value);    //setting value of field equal to value required
        this.setState({ [name] : value ,fileSize});//using array syntax so that it dynamically changes value depending on event occuring on which input tag 
        } 

    isValid(){  //check for errors if any whil eupdating user

        const {name,email,fileSize} = this.state;

        if(fileSize > 1000000){ //this size is in bytes (1000 kb limit or 1mb)
            this.setState({ error : "File Size should be less than 100kb" , loading : false});
            return false;
        }

        if(name.length === 0) {
            this.setState({ error : "Name is required" , loading : false});
            return false;
        }

        if(!/.+\@.+\..+/.test(email)){  //check email domain with given regex
            this.setState({ error : "Valid Email is required" , loading : false});       
            return false;
        }

        return true;

    }
    
    clickSubmit = (event) => {
            event.preventDefault();
            this.setState({ loading : true });

            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

        if(this.isValid())
        {
               // console.log(user);
                update(userId,token,this.userData)
                .then( (data) => {
                    if(data.error) this.setState({ error : data.error });
                    else{
                   // console.log(data);
                    updateUserName(data, () => {   //this is what passed to next parameter of updateUserName function in apiUser
                        this.setState({ redirectToProfile : true });
                    });
                    
                    }
                });
        }
            
        }

    editForm(id,name,email,about){ //edit form also takes image and accepts every type of image
        return (    //accept property of image only shows images when trying to select one
        <form>
             <div className = "form-group">
                <label className = "text-muted">Profile Photo</label>   
                <input onChange = {this.handleChange("photo")} type = "file" accept  = "image/*" className = "form-control"/>
            </div>
            <div className = "form-group">
                <label className = "text-muted">Name</label>
                <input value = {name} onChange = {this.handleChange("name")} type = "text" className = "form-control"/>
            </div>
            <div className = "form-group">
                <label className = "text-muted">Email</label>
                <input value = {email} onChange = {this.handleChange("email")} type = "email" className = "form-control"/>
            </div>

            <div className = "form-group">
                <label className = "text-muted">About</label>
                <textarea value = {about} onChange = {this.handleChange("about")} type = "text" className = "form-control"/>
            </div>

            <div className = 'd-inline-block'>
                <button onClick = {this.clickSubmit} className = "btn btn-raised btn-primary">Update Profile</button>
                <Link to = {`/user/updatePassword/${id}`} className = 'btn btn-raised btn-primary ml-5'>Update Password</Link>
            </div>
        
        </form>
        );
    }

    render() {
        const {id,name,email,error,about,redirectToProfile,loading} = this.state;
       
        if(redirectToProfile) return <Redirect to = {`/user/${id}`} />

        const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : avatar;

        return (
            <div className="container">
                <h2 className = 'mt-5 mb-5'>Edit Profile</h2>
                
                <div className = "alert alert-warning" style = {{ display : error ? "" : "none" }}>
                    {error}
                </div>
                
                <img className="img-thumbnail mb-5" style ={{ width:'auto' , height:'200px' , objectFit:'cover' }} src={photoUrl} 
                onError = { (photo) => {return photo.target.src = `${avatar}`} } alt={`${name}`}/> 
           
            {loading ?
            (   <div className = 'jumbotron text-center'>
                    <h2>Loading</h2>
                </div>
            ) : 
                ("")
            }         
                {this.editForm(id,name,email,about)}
            </div>
        );
    }
}

export default EditProfile;