import React,{Component} from 'react';
import avatar from '../images/avatar.png'; 
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';

class ProfileTab extends Component{

    render(){    //getting these from props

        const {followers,following,posts} = this.props;
        return (

            <div>
            
            <div className = 'row'>
                <div className = 'col-md-4'>
                    <h4 >Followers</h4>
                    <hr />
                    {
                        followers.map( (person,i) => {
                            return (
                                <div key={i} >
                                    <div className='row'>
                                    <Link to = {`/user/${person._id}`} >
                                        <img className = 'rounded-circle float-left mr-3 mb-3' height = '50px' width = '50px'
                                        src = {`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`} 
                                        onError = { photo => photo.target.src = `${avatar}` } alt = {person.name}  />

                                        <div>
                                            <h5>{person.name}</h5>
                                        </div>
                                    </Link>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>   

                <div className = 'col-md-4'>
                    <h4 >Following</h4>
                    <hr />
                    {
                        following.map( (person,i) => {
                            return (
                                <div key={i} >
                                    <div className ='row'>
                                    <Link to = {`/user/${person._id}`} >
                                        <img className = 'rounded-circle float-left mr-3 mb-3' height = '50px' width = '50px'
                                        src = {`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`} 
                                        onError = { photo => photo.target.src = `${avatar}` } alt = {person.name}  />

                                        <div>
                                            <h5>{person.name}</h5>
                                        </div>
                                    </Link>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div> 

                <div className = 'col-md-4'>
                    <h4 >Posts</h4>
                    <hr />
                    
                    {
                        posts.map( (post,i) => {
                            return (
                                <div key={i} >
                                    <div className ='row'>
                                    <Link to = {`/post/${post._id}`} >
                                        <div>
                                            <h5>{post.title}</h5>
                                        </div>
                                    </Link>
                                    </div>
                                </div>
                            );
                        })
                    }

                </div>

            </div>

            </div>

        );
    }

};
export default withRouter(ProfileTab);