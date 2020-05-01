import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isAuthenticated} from './index';
//after making this component we do not require to check at every component render mehtod if it authenticated user is accessing it or not
const PrivateRoute = ( {component : Component , ...rest} ) => {     //this is used so taht routes can be accessed by only authorised users
    return (
        <Route {...rest} render = { //decides what to render same as render function in class component
            (props) => {
               return isAuthenticated() ? 
                ( <Component {...props} />) : 
                ( <Redirect to ={{pathname : '/signin' , state : {from : props.location}}} /> 
            )} 
        }
        />
    );
}

export default PrivateRoute;