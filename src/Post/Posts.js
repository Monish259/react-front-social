import React,{Component} from 'react';
import {list} from './apiPost';
import postImage from '../images/postImage.jpg'; 
import {Link} from 'react-router-dom';

class Posts extends Component{

    constructor(props){
        super(props);
        this.state = {
            posts : [], //creating empty array of users to sotr what we get from backend in this
            loading : false
        };
    }

    componentDidMount(){        // no need to write function keyword in modern js
        this.setState({ loading : true });
        list()
        .then( (data) => {
            if(data.error) console.log("ERROR!!");
            else this.setState({ posts : data , loading : false });
        })
    }

    renderPosts = (posts) => {
       return (
        <div className = 'row'>
                {posts.map( (post,i) => { // callback function inside map function taking value and index parameter to loop through users in array
               // console.log("POST CREATED !!!! :  " , post.created);
               const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
               const posterName = post.postedBy ? post.postedBy.name : "Unknown";
               
               return (
                <div className="card col-sm-3 mr-4 mt-4 mb-4 ml-4" key = {i}>
                   <img className="img-thumbnail" style ={{ width:'100%' , height:'200px' , objectFit:'cover' }} src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}`}
                   onError = { (photo) => {return photo.target.src = `${postImage}`} } alt ='post'/>
                   <div className="card-body mt-auto">
                     <h5 className="card-title">{post.title.length > 21 ? post.title.substring(0,15)+"..." : post.title}</h5>
                     <p className="card-text">{post.body.length > 21 ? post.body.substring(0,20)+"..." : post.body}</p>

                    <p className = 'font-italic mark'>
                        Posted By <Link to = {`${posterId}`}>{posterName}</Link> on {new Date(post.created).toDateString()}
                    </p>
                     <Link to={`/post/${post._id}`} className="btn btn-raised btn-primary btn-sm">View Post</Link>  
                   </div>
                </div>
                )})}
        </div>
       );
    }

    render(){
        const {posts,loading} = this.state;
        return(
            <div className='container'>

                {loading ?
                (   <div className = 'jumbotron text-center'>
                        <h2>Loading</h2>
                    </div>
                ) : 
                    ("")
                }  

                <h2 className = 'mt-5 mb-5'>Posts</h2>
                {this.renderPosts(posts)}
            </div>
        );
    }
}

export default Posts;