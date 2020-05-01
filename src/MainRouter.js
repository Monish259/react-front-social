import React from 'react';
import {Route,Switch} from 'react-router-dom';
import ForgotPassword from './User/ForgotPassword';
import ResetPassword from "./User/ResetPassword";
import Home from './core/Home';
import Signup from './User/Signup';
import Signin from './User/Signin';
import Profile from './User/Profile';
import Users from './User/Users';
import EditProfile from './User/EditProfile';
import UpdatePassword from './User/UpdatePassword';
import FindPeople from './User/FindPeople';
import NewPost from './Post/NewPost';
import SinglePost from './Post/SinglePost';
import EditPost from './Post/EditPost';
import Menu from './core/Menu';//Navbar
import PrivateRoute from './auth/PrivateRoute'; //this Component ensures security to certain pages which requires only logged in user
// always use capital letter to start a component name and properties in html tag in small letters always
const MainRouter = () => {//Route points to react component and Switch used to keep sync b/w UI and URL when Routes are switched
    return (
        <div>
        <Menu />
            <Switch>
                <Route exact path = "/" component = {Home}/>
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path ="/reset-password/:resetPasswordToken" component={ResetPassword} />
                <PrivateRoute exact path = "/post/create" component = {NewPost}/> 
                <Route exact path = "/post/:postId" component = {SinglePost}/>
                <PrivateRoute exact path = "/post/edit/:postId" component = {EditPost}/>
                <Route exact path = "/users" component = {Users}/>
                <Route exact path = "/signup" component = {Signup}/> 
                <Route exact path = "/signin" component = {Signin}/> 
                <PrivateRoute exact path = "/user/:userId" component = {Profile}/>
                <PrivateRoute exact path = "/user/edit/:userId" component = {EditProfile}/> 
                <PrivateRoute exact path = "/findPeople" component = {FindPeople}/> 
               <PrivateRoute exact path = "/user/updatePassword/:userId" component = {UpdatePassword}/> 
            </Switch>
        </div>
    );
};

export default MainRouter;