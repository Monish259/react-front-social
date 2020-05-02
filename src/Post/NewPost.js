import React,{Component} from 'react';
import {create} from './apiPost';
import {isAuthenticated} from '../auth';
import { Redirect } from 'react-router-dom';

class NewPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            title : '',
            body : '',
            error : '',
            user : {}, 
            redirectToProfile : false,
            loading : false,
            fileSize : 0
        }
    }

    componentDidMount(){ //after component mounts on browser after that all operations are occured
      //  console.log('user_id : ',this.props.match.params.userId);
        this.postData = new FormData(); //used to send request as multipart/form-data to backend
        this.setState( {user : isAuthenticated().user} );
    }

        //used for making controlled component 
    handleChange = (name) => (event) => { //event is trigerrred when onchange event runs and value is parameter for handle change function and it keeps on changing depending on i/p
        this.setState({ error : "" });  //everytime there is any change in input field errors will be cleared
        const value = name === 'photo' ? event.target.files[0] : event.target.value;

        const fileSize = name ==='photo' ? event.target.files[0].size : 0; //getting filesize of uploaded photo
        
        this.postData.set(name , value);    //setting value of field equal to value required
        this.setState({ [name] : value ,fileSize});//using array syntax so that it dynamically changes value depending on event occuring on which input tag 
        } 

    isValid(){  //check for errors if any whil eupdating user

        const {title,body,fileSize} = this.state;

        if(fileSize > 100000){ //this size is in bytes
            this.setState({ error : "File Size should be less than 100kb" , loading : false});
            return false;
        }

        if(title.length === 0 || title.length < 4) {
            this.setState({ error : "Title is required of more than 3 characters" , loading : false});
            return false;
        }

        if(body.length === 0 || body.length < 4) {
            this.setState({ error : "Body is required of more than 3 characters" , loading : false});
            return false;
        }

        return true;
    }
    
    clickSubmit = (event) => {
            event.preventDefault();
            this.setState({ loading : true });

            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

        if(this.isValid())
        {
               // console.log(user);
                create(userId,token,this.postData)
                .then( (data) => {
                    if(data.error) this.setState({ error : data.error ,loading : false});
                    else{
                    //console.log(data);
                     this.setState({ 
                        redirectToProfile : true,
                        loading : false 
                        });
                    }
                });
        }
            
        }

    createPostForm(title,body,loading){ //edit form also takes image and accepts every type of image
       
        if(loading) return (
        <div className = 'jumbotron text-center'>
        <h2><i className="fa fa-spinner fa-spin"/>  Loading</h2>
        </div>
        );

        return (    //accept property of image only shows images when trying to select one
       <form>
             <div className = "form-group">
                <label className = "text-muted">Profile Photo</label>   
                <input onChange = {this.handleChange("photo")} type = "file" accept  = "image/*" className = "form-control"/>
            </div>
            <div className = "form-group">
                <label className = "text-muted">Title</label>
                <input value = {title} onChange = {this.handleChange("title")} type = "text" className = "form-control"/>
            </div>

            <div className = "form-group">
                <label className = "text-muted">Body</label>
                <textarea value = {body} onChange = {this.handleChange("body")} type = "text" className = "form-control"/>
            </div>
    
                <button onClick = {this.clickSubmit} className = "btn btn-raised btn-primary">Create Post</button>  
          
        
        </form>
        );
    }

    render() {
        const {user,title,body,error,redirectToProfile,loading} = this.state;
       
        if(redirectToProfile) return <Redirect to = {`/user/${user._id}`} />

        return (
            <div className="container">
                <h2 className = 'mt-5 mb-5'>Create Post</h2>
                
                <div className = "alert alert-warning" style = {{ display : error ? "" : "none" }}>
                    {error}
                </div>
                {this.createPostForm(title,body,loading)}
            </div>
        );
    }
}

export default NewPost;