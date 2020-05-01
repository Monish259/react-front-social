
export const signup = (user) => {
    return fetch(`${process.env.REACT_APP_API_URL}/signup`,{//1st param : URL from where it will connect with backend Api(Node_Api) , 2nd param : all data required
         method : "POST",
         headers : {
             "Accept" : "application/json",
             "Content-Type" : "application/json"
         },
         body : JSON.stringify(user)
     })
     .then ( (response) => {
         return response.json();
     })
     .catch( (err) => console.log(err) ); 
 }


export const signin = (user) => {
    return fetch(`${process.env.REACT_APP_API_URL}/signin`,{//1st param : URL from where it will connect with backend Api(Node_Api) , 2nd param : all data required
         method : "POST",
         headers : {
             "Accept" : "application/json",
             "Content-Type" : "application/json"
         },
         body : JSON.stringify(user)
     })
     .then ( (response) => {
         return response.json();
     })
     .catch( (err) => console.log(err) ); 
 }

export const signout = (next) => {
    if(typeof window !== "undefined") localStorage.removeItem("jwt");
    next(); //pushing home ('/') path to history so that user is redirected to home page
    return fetch(`${process.env.REACT_APP_API_URL}/signout`,{
      method : "GET"
    })
    .then( (response) => {
      console.log("Signout success");
      return response.json();
    })
    .catch(err => console.log(err)); 
  }

export const authenticate = (jwt,next) => {
    if(typeof window !== "undefined")  // to check if component is mounted then only next step can be proceeded
        localStorage.setItem("jwt",JSON.stringify(jwt)); //storing data in local storage of chrome for authentication purpose
}


export const isAuthenticated = () => {
    if(typeof window === "undefined")  return false;
    if(localStorage.getItem("jwt"))   return JSON.parse(localStorage.getItem("jwt")); //parsing diff items from JSON object separately
    else return false;
}

export const forgotPassword = (email) => {
    return fetch(`${process.env.REACT_APP_API_URL}/forgot-password`,{
        method : "PUT",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({email})
    })
    .then(response => response.json())
    .catch(err => console.log(err));
};

export const resetPassword = (newPassword,resetPasswordLink) => {
    return fetch(`${process.env.REACT_APP_API_URL}/reset-password`,{
        method : "PUT",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({resetPasswordLink,newPassword})
    })
    .then(response => response.json())
    .catch(err => console.log(err));
};

//social login 
export const socialLogin = (user) => {
    return fetch(`${process.env.REACT_APP_API_URL}/social-login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // credentials: "include", // works only in the same origin
        body: JSON.stringify(user)
    })
        .then(response => {
           // console.log("signin response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};