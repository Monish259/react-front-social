import React from 'react';
import Posts from '../Post/Posts';

const Home = () => {
    return (
        <div>
        <div className = "jumbotron">
            <h1>Home</h1>
        </div>
        <div className = 'container'>
            <Posts />
        </div>
        </div>
    )
};

export default Home;