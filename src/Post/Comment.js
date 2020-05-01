import React,{Component} from 'react';
import {comment,unComment} from './apiPost';
import {isAuthenticated} from '../auth';
import {Link, Redirect} from 'react-router-dom';
import avatar from '../images/avatar.png';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

class Comment extends Component{

    constructor(props){
        super(props);
        this.state = { 
            text : "",
            error : "",
            redirectToSignin : false
         };
    }

    handleChange = (value) =>(event) => {
        this.setState({ error : "" , [value] : event.target.value });
    };

    isValid(){  //check for errors if any whil eupdating user

        const {text} = this.state;

        if(text.length === 0 || text.length > 150) {
            this.setState({ error : "Cannot post empty comment or more than 150 cahracters long!!" });
            return false;
        }

        return true;
    }

    addComment = (event) => {
        event.preventDefault();

    if(!isAuthenticated()) {
        this.setState({ error : "Please login to add comments !!" ,text : ""});
        return false;
    }

        const token = isAuthenticated().token;
        const postId = this.props.postId;
        const userId = isAuthenticated().user._id;
        const upload = {text : this.state.text} //coz post model stores comments text in array holding objects
   
    if(this.isValid()){
        comment(postId,userId,token,upload)
        .then(data => {
            if(data.error) console.log(data.error);
            else {  
                this.setState({ text : "" ,error : ""});
                this.props.updateComments(data.comments);
            }
        });
    }

    };

    removeComment = (comment) => {

        if(!isAuthenticated()) this.setState({ redirectToSignin : true });

        const userId = isAuthenticated().user._id;
        const postId = this.props.postId;
        const token = isAuthenticated().token;

        unComment(postId,userId,token,comment)
        .then( data => {
            if(data.error) console.log(data.error);
            else this.props.updateComments(data.comments);
        });

    };

    confirmDelete = (comment) => { //postId passed in component form profile.js file is present in props here
        let sure = window.confirm("Are you sure you want to delete this post...");
        if(sure) {
            this.removeComment(comment);
        }
    };


    render(){
        const{comments} = this.props;
        const{error,redirectToSignin} = this.state;

        if(redirectToSignin) return <Redirect to = '/' />

        return(
            <div>
                <h3 className = 'mt-5 mb-4'>Leave a Comment</h3>
                
                <div className = "alert alert-warning" style = {{ display : error ? "" : "none" }}>
                    {error}
                </div>

            <div className = 'form-group'>
            <form onSubmit = {this.addComment}> 
                <input placeholder = "Leave a comment..." value = {this.state.text} className='form-control' onChange = {this.handleChange("text")} type = 'textarea'/>
                <button className="btn btn-raised btn-success mt-2"> Post </button>
            </form>
            </div>

            <div className = 'col-md-12'>
                    <h3 className = "text-primary">{comments.length} Comments</h3>
                    <hr />
                {
                        comments.map( (comment,i) => {
                            return (
                            <div key={i} >
                                    <div>
                                    <Link to = {`/user/${comment.postedBy._id}`} >
                                        <img className = 'rounded-circle float-left mr-3 mb-3' height = '50px' width = '50px'
                                        src = {`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`} 
                                        onError = { photo => photo.target.src = `${avatar}` } alt = {comment.postedBy.name}  />
                                    </Link>

                            <div>
                            <div className='d-inline-block'>
                            <p className = 'lead'>{comment.text}</p>  
                            </div>
                            <br />
                            <p className = 'font-italic mark mb-5'>
                             Posted By <Link to = {`/user/${comment.postedBy._id}`}>{comment.postedBy.name}</Link> on {new Date(comment.created).toDateString()}

                             {isAuthenticated() && isAuthenticated().user._id === comment.postedBy._id &&
                            <div onClick = { () => this.confirmDelete(comment)} className = 'float-right'>{/* passing comment in removeComment in a arrow function so that it dont runs on every load unless is clicked*/}
                                <Tooltip title="Delete" placement="right-start">
                                <DeleteIcon color = 'secondary'/>
                                </Tooltip>
                            </div>
                }          

                            </p>
                            </div>
                </div>
                </div>
                            );
                        })
                    }
                </div> 

            </div>
        );
    }
}
export default Comment;