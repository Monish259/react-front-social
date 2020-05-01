import React from "react";
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './MainRouter';

const App = () => {//Browser Router keeps UI and URL in sync 
 return (
    <BrowserRouter>
      <MainRouter/>
    </BrowserRouter>
 );
};

export default App;
