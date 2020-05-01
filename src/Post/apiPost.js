export const create = (userId,token,post) => {
     // console.log("create   userId : " , userId + " unFollowId : "+ unFollowId);
     return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`,{
        method  : "POST",
        headers : {
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : post //sending form/multipart data so no contect-type is set and no JSON.Stringify 
    })
    .then( response => {return response.json();} ) //this is promise which return data as response from node and this step is mandatory whiel fetching from any url in react from node
    .catch( err => console.log(err) ); 
};

//below function used to fetch all posts
export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts`,{
        method  : "GET",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        } 
    })
    .then( response => {return response.json();} ) //this is promise which return data as response from node and this step is mandatory whiel fetching from any url in react from node
    .catch( err => console.log(err) ); 
};

//below function used to fetch post where view post is clicked
export const getSinglePost = (postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
        method  : "GET",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        } 
    })
    .then( response => {return response.json();} ) //this is promise which return data as response from node and this step is mandatory whiel fetching from any url in react from node
    .catch( err => console.log(err) ); 
};

//delete post 
export const deletePost = (postId,token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}` ,{
        method : "DELETE",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then( response => response.json() )
    .catch( err => console.log(err) );
};

export const deleteAllPosts = (userId,token) => {
   // console.log(" INSIDE DELETE ALL POSTS IN API POST :   " + userId + "  TOKEN :  " + token + "  URL :   " + `${process.env.REACT_APP_API_URL}/post/deleteAllPosts` );
    return fetch(`${process.env.REACT_APP_API_URL}/posts/${userId}` ,{
        method : "DELETE",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then ( response => response.json() )
    .catch( err => console.log(err) );
};


//update post
export const updatePost = (postId,token,post) =>    {
    return fetch( `${process.env.REACT_APP_API_URL}/post/${postId}` ,{
        method : "PUT",
        headers : {
            "Accept" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : post //post is in form of post data
    })
    .then ( response => response.json() )
    .catch( err => console.log(err) );
};

//like post
export const like = (postId,userId,token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/like`,{
        method : "PUT",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify( {userId,postId} )
    })
    .then( response => {return response.json();} )
    .catch( err => console.log(err) );

};

//unlike post
export const unLike = (postId,userId,token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`,{
        method : "PUT",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({ userId,postId })
    })
    .then( response => response.json() )
    .catch( err => console.log(err) );

};

//comment
export const comment = (postId,userId,token,comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/comment`,{
        method : "PUT",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify( {userId,postId,comment} )
    })
    .then( response => {return response.json();} )
    .catch( err => console.log(err) );

};

//uncomment
export const unComment = (postId,userId,token,comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`,{
        method : "PUT",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({ userId,postId,comment})
    })
    .then( response => response.json() )
    .catch( err => console.log(err) );

};
