export const read = (userId,token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
        method  : "GET",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        } 
    })
    .then( response => {return response.json();} ) //this is promise which return data as response from node and this step is mandatory whiel fetching from any url in react from node
    .catch( err => console.log(err) ); 
};

//below function used to delete user account
export const remove = (userId,token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
        method  : "DELETE",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        } 
    })
    .then( response => {return response.json();} ) //this is promise which return data as response from node and this step is mandatory whiel fetching from any url in react from node
    .catch( err => console.log(err) ); 
};

//below function used to fetch all users
export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`,{
        method  : "GET",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        } 
    })
    .then( response => {return response.json();} ) //this is promise which return data as response from node and this step is mandatory whiel fetching from any url in react from node
    .catch( err => console.log(err) ); 
};

//used to update user profile
export const update = (userId,token,user) => {  //fetching data with photo and this is to update every details of user other than password
    //console.log("user data update : " , user);
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
        method  : "PUT",
        headers : {
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : user //not stringifying coz form data is received not json data from user parameter
    })
    .then( response => {return response.json();} ) //this is promise which return data as response from node and this step is mandatory whiel fetching from any url in react from node
    .catch( err => console.log(err) ); 
};

//used to update user password
export const updatePassword = (userId,token,user) => {  //just for updating password of user
    //  console.log("user data update : " , user);
      return fetch(`${process.env.REACT_APP_API_URL}/user/updatePwd/${userId}`,{
          method  : "PUT",
          headers : {
              "Accept" : "application/json",
              "Content-Type" : "application/json",
              "Authorization" : `Bearer ${token}`
          },
          body : JSON.stringify(user) 
      })
      .then( response => {return response.json();} ) //this is promise which return data as response from node and this step is mandatory whiel fetching from any url in react from node
      .catch( err => console.log(err) ); 
  };


//update user name in menu when updated by user in edit profile page , next parameter is callback so that site should move to next activity
export const updateUserName = (user,next) => { 

    if (typeof (window) !== 'undefined') {
        if(localStorage.getItem('jwt')){
            let auth = JSON.parse(localStorage.getItem('jwt'));//getting token and user from local storage
            auth.user = user;       //updating user stored in local storage eith updated user in edit profile page
            localStorage.setItem('jwt',JSON.stringify(auth));   //againg setting jwt with updated user in local storage
            next(); //executing further in update in edit profile 
        }
    }

}


//for follow button functionality
export const clickFollow = (userId,followId,token) => {
   // console.log("clickFollow   userId : " , userId + " followId : "+ followId);
    return fetch(`${process.env.REACT_APP_API_URL}/user/follow`,{
        method  : "PUT",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify( {userId,followId} ) 
    })
    .then( response => {return response.json();} ) //this is promise which return data as response from node and this step is mandatory whiel fetching from any url in react from node
    .catch( err => console.log(err) ); 
};


//for unfollow button functionality
export const clickUnFollow = (userId,unFollowId,token) => {
    // console.log("clickFollow   userId : " , userId + " unFollowId : "+ unFollowId);
     return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`,{
         method  : "PUT",
         headers : {
             "Accept" : "application/json",
             "Content-Type" : "application/json",
             "Authorization" : `Bearer ${token}`
         },
         body : JSON.stringify( {userId,unFollowId} ) 
     })
     .then( response => {return response.json();} ) //this is promise which return data as response from node and this step is mandatory whiel fetching from any url in react from node
     .catch( err => console.log(err) ); 
 };


//display users which are not folllowed by logged in user
export const findPeople = (userId,token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/findPeople/${userId}`,{
        method  : "GET",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then( response => {return response.json();} ) //this is promise which return data as response from node and this step is mandatory whiel fetching from any url in react from node
    .catch( err => console.log(err) ); 
};


//to get posts created by logged in user
export const postsByUser = (userId,token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/by/${userId}`,{
        method  : "GET",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then( response => {return response.json();} ) //this is promise which return data as response from node and this step is mandatory whiel fetching from any url in react from node
    .catch( err => console.log(err) ); 
}; 