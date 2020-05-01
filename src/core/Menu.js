import React from 'react';
import {Link , withRouter} from 'react-router-dom';//Link switches b/w pages dynamically without reloading container
//withRouter component gives access to props and it is higher order function which takes other component as i/p
//history.push("/") enters path "/" in history property of props
import {isAuthenticated,signout} from '../auth';

const isActive = (history,path) => {
    //console.log("prev path : " + history.location.pathname +  ' URL path clicked : ' + path + ' current clicked link :  ' + pathName);
    if(history.location.pathname === path) return {color : "#ff9900"};
    return {color : "#ffffff"};
}

const Menu = ( {history} ) => {//same like props.history , just destructuring for code clarity

  return (
    <div>
        
<ul className="nav nav-tabs bg-primary">
  <li className="nav-item">
    <Link to = "/" className="nav-link" style = {isActive(history,"/")}>Home</Link>
  </li>
  <li className="nav-item">
    <Link to = "/users" className="nav-link" style = {isActive(history,"/users")}>Users</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to = '/post/create' style={isActive(history, '/post/create')} >Create Post</Link>
  </li>
{ !isAuthenticated() && (
<>
  <li className="nav-item">
    <Link to = "/signup" className="nav-link" style = {isActive(history,"/signup")}>Sign Up</Link>
  </li>
  <li className="nav-item">
    <Link to = "/signin" className="nav-link" style = {isActive(history,"/signin")}>Sign In</Link>
  </li>
</>
)}
{ isAuthenticated() && (
<React.Fragment>

  <li className="nav-item">
    <Link className="nav-link" to = {`/user/${isAuthenticated().user._id}`} style={isActive(history, `/user/${isAuthenticated().user._id}`)} >{`${isAuthenticated().user.name}'s profile`}</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to = '/findPeople' style={isActive(history, 'findPeople')} >Find People</Link>
  </li>
   <li className="nav-item">
    <span className="nav-link" style = {isActive(history,"/signup")} onClick = { () => {signout( () => {return history.push("/");}) }}>Sign Out</span>
  </li>

</React.Fragment>
)}
</ul>  
       
    </div>
    );
}//in signout a tag is used . onCLick means its calling  function named signout and that function is getting event as parameter which is setting history to "/" path

export default withRouter(Menu);