import React,{Component} from 'react';
import {isAuthenticated} from '../auth';
import {Redirect,Link} from 'react-router-dom';
import {read,clickFollow,clickUnFollow,postsByUser} from './apiUser';
import avatar from '../images/avatar.png'; 
import DeleteUser from './DeleteUser';
import FollowButton from './FollowButton';
import ProfileTab from './ProfileTab';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user : { followers: [] , following : [] },
            redirectToSignin : false,
            following : false,
            error : "",
            posts : []
        };
    }

    checkFollow = (user) => {   //checking if follow button or unfollow button is required to show
        const jwt = isAuthenticated().user; //getting logged in user from local storage

        const match = user.followers.length > 0 ? (user.followers.map( (follower) => { //getting user data from state where user has clicked on view details and comparing if follower list of user we have clicked have logged in user in it

            return follower._id === jwt._id; 

        })) : false;

        return match;
    };

    //click unfollow button functionality
    clickFollowButton = () => {       // functionality of follow button
        const userId = isAuthenticated().user._id;
        const followId = this.state.user._id;   //following state member will be changed after calling this function
        const token = isAuthenticated().token;
       // console.log("onClick Follow fired !!!!");

        clickFollow(userId,followId,token)
        .then( (data) => {
            if(data.error) this.setState({ error : data.error });
            else {
                //checking if following is an object or boolean then saving it in state accordingly 
                let check =  typeof (this.state.following) === 'object' ? (this.state.following[this.state.following.length-1]) : (this.state.following) ;
                this.setState({ user : data , following : !check });
            }
        });

    };

    //click unfollow button functionality
    clickUnFollowButton = () => {       // functionality of follow button
        const userId = isAuthenticated().user._id;
        const unFollowId = this.state.user._id;   //following state member will be changed after calling this function
        const token = isAuthenticated().token;

        clickUnFollow(userId,unFollowId,token)
        .then( (data) => {
            if(data.error) this.setState({ error : data.error });
            else {
                let check =  typeof (this.state.following) === 'object' ? (this.state.following[this.state.following.length-1]) : (this.state.following) ;
                this.setState({ user : data , following : !check });
            }
        });

    };

    
    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId,token).then( (data) => 
        {
            if(data.Error) this.setState( {redirectToSignin : true} ); //if error in data then user is not authenticated and need to redirect it to signin page
            else {
              // console.log(data);
               let following = this.checkFollow(data.user);
               this.setState({ user : data.user , following });  
               this.loadPosts(data.user._id); 
            }
        } 
        ) 
    }

    loadPosts(userId){  //to get all posts created by logged in user
        const token = isAuthenticated().token;
        postsByUser(userId,token)
        .then( data => {
            if(data.error) console.log(data.error);
            else{
                this.setState({ posts : data });
            }
        })
    };

    componentDidMount(){ //after component mounts on browser after that all operations are occured
       // console.log('user_id : ',this.props.match.params.userId + " going to init function ");
        const userId = this.props.match.params.userId; //this id is that which get passed in MainRouter component from Menu Component.
        this.init(userId);
    }
    
    //here props parameter holds new value received from react or change in any prop parameter
    UNSAFE_componentWillReceiveProps(props){ //after component recieves parameters as props in browser after that all operations are occured
         // console.log('user_id : ',props.match.params.userId + " WHEN USERID CHANEGD !! ");
          const userId = props.match.params.userId; //this id is that which get passed in MainRouter component from Menu Component.
          this.init(userId);
      }  

    render(){
            const {redirectToSignin,user,following,posts} = this.state;
           // console.log(" INSIDE RENDER : " , following , " TYPE OF FOLLOWING : " , typeof(following));

            if(redirectToSignin) return <Redirect to = '/signin'/>;
            //fetching user profile pic from backend and adding time as timestamp so every photo is updated browser show that only not the one store in cache
            const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}` : avatar;

        return( //vw meaningview port size  // passing function to onError property in img tag to display default image when any error is there
        <div className = 'container'>
        <h2 className = 'mt-5 mb-5'>Profile</h2>
            <div className = 'row'>
                <div className = 'col-md-4'>
                <img className="img-thumbnail" style ={{ width:'auto' , height:'200px' , objectFit:'cover' }} src={photoUrl} 
                onError = { (photo) => {return photo.target.src = `${avatar}`} } alt={`${user.name}`}/> 
                </div>
                <div className = 'col-md-8'>
                    <div className = 'lead'>
                        <p>{`Username :  ${user.name}`}</p>
                        <p>{`Email : ${user.email}`}</p>
                        <p>{`Joined on : ${new Date(this.state.user.created).toDateString()}`}</p>
                    </div>
                {isAuthenticated().user && isAuthenticated().user._id === user._id ?
                (
                    <div className = 'd-inline-block'>
                        <Link to = '/post/create' className = 'btn btn-raised btn-info mr-5'>Create Post</Link>
                        <Link to = {`/user/edit/${user._id}`} className = 'btn btn-raised btn-success mr-5'>Edit Profile</Link>
                        <DeleteUser userId={user._id}/>
                    </div>
                ) : <FollowButton following={ typeof (following) === 'object' ? (following[following.length-1]) : (following) } onClickFollow = {this.clickFollowButton} onClickUnFollow = {this.clickUnFollowButton} /> 
                }
                </div>  

            </div>

            <div className = 'row'>
               
                <div className = 'col md-12 mt-5'>
                <h4 className = 'mb-3'> About </h4>
                <hr />
                    <p className = 'lead'>{user.about}</p>
                <hr />

                <ProfileTab followers = {user.followers} following = {user.following} posts = {posts}/> 
                </div>
            </div>

        </div>
        )}
}

export default Profile;