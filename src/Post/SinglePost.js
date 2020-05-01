import React,{Component} from 'react';
import {getSinglePost,deletePost,like,unLike} from './apiPost';
import postImage from '../images/postImage.jpg';
import {Link, Redirect} from 'react-router-dom';
import {isAuthenticated} from '../auth';
import Comment from './Comment';

class SinglePost extends Component{

    constructor(props){
        super(props);
        this.state = {
            post : '',
            loading : false,
            redirectToHome : false,
            redirectToSignin : false,
            likes : 0,
            like : false, // to check if user has cilcked on like
            comments : [],
            error : ""
        };
    }

    getPost = (postId) => {
        this.setState({ loading : true });
        getSinglePost(postId)
        .then( (data) => {
            if(data.error) console.log(data.error);
            else {
                this.setState({ 
                    post : data , 
                    loading : false ,
                    likes : data.likes.length , 
                    like : this.checkLike(data.likes),
                    comments : data.comments.reverse(),
                    error : ""
                });
        }
        });
    }

    checkLike(likes){
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let check = likes.indexOf(userId) !== -1 ; //-1 means not existing in likes arrray
        return check;
    };

    likeToggle = () => {

        if(!isAuthenticated()) {this.setState({ error : "Please login to like this post" });return false}

        const userId = isAuthenticated().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticated().token;

        if(this.state.like)
        {
            unLike(postId,userId,token)
            .then( (data) => {
            if(data.error) console.log(data.error);
            else this.setState({ like : !this.state.like , likes : data.likes.length ,error:"" });
        });
        }

        else {
            like(postId,userId,token)
            .then( (data) => {
            if(data.error) console.log( data.error);
            else this.setState({ like : !this.state.like , likes : data.likes.length ,error :"" });
        });
    }

    };

    componentDidMount(){
        const postId = this.props.match.params.postId;  //getting post id from Main router passed from posts
        this.getPost(postId);
    }

    deleteConfirmed = (postId,token) => {

        deletePost(postId,token)
        .then( (data)=> {
            if(data.error) console.log("ERROR");
            else {  
                    this.setState({ redirectToHome : true });
            }
        });
    }

    confirmDelete = () => { //postId passed in component form profile.js file is present in props here
        let sure = window.confirm("Are you sure you want to delete this post...");
        if(sure) {
            const token = isAuthenticated().token;
            const postId = this.props.match.params.postId;
            this.deleteConfirmed(postId,token);
        }
    };

    updateComments = (comments) => {
        this.setState({ comments : comments.reverse(),error : "" });
    };

    renderPost(post,error){
        
        const {like,likes} = this.state;

        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const posterName = post.postedBy ? post.postedBy.name : "Unknown";

        if(post._id) {

        return (
            <div className = 'card-body'>
               <h2 className = 'mt-5 mb-4'>{post.title}</h2>
               <img className="img-thumbnail mb-4" style ={{ width:'300px' , height:'300px' , objectFit:'cover' }} src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}`}
               onError = { (photo) => {return photo.target.src = `${postImage}`} } alt ={post.title}/>

                <div className = "alert alert-warning" style = {{ display : error ? "" : "none" }}>
                {error}
                </div>

                {
                    like ? (<h4 className = "mb-4" onClick = {this.likeToggle}><i className="fa fa-thumbs-up text-success bg-dark" style ={{ padding:'10px',borderRadius:'50%' }} />{" "}{likes} Likes</h4>) : 
                    (<h4 className = "mb-4" onClick = {this.likeToggle}><i className="fa fa-thumbs-down text-warning bg-dark" style ={{ padding:'10px',borderRadius:'50%' }} />{" "}{likes} Likes</h4>)
                }
               
                <p className="card-text">{post.body}</p>

                <p className = 'font-italic mark'>
                    Posted By <Link to = {`${posterId}`}>{posterName}</Link> on {new Date(post.created).toDateString()}
                </p>

                <Link to = '/' className = 'btn btn-raised btn-success'> Back to Posts </Link>

                { isAuthenticated().user  && isAuthenticated().user._id === post.postedBy._id &&
                (
                  <>
                  <Link to = {`/post/edit/${post._id}`} className = 'btn btn-raised btn-info ml-4'>Update Post</Link>
                  <button onClick = {this.confirmDelete} className = 'btn btn-raised btn-warning ml-4'>Delete Post</button>
                  </>
                )
                }

            <Comment postId = {post._id} comments = {this.state.comments} updateComments = {this.updateComments}/>
            </div>
            
            );
        }
    };

    render(){
        const {post,loading,redirectToSignin,redirectToHome,error} = this.state;

        if(redirectToHome) return <Redirect to = '/'/>
        else if(redirectToSignin) return <Redirect to = '/signin'/>

        return(
            <div className = 'container'>

                {loading ?
                (   <div className = 'jumbotron text-center'>
                        <h2>Loading</h2>
                    </div>
                ) : 
                    ("")
                }  

                {this.renderPost(post,error)}
            </div>
            );
    }
}

export default SinglePost;