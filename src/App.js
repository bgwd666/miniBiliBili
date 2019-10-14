import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';

import Home from './pages/home/home';
import Login from './pages/login/login';
import VideoDetails from './pages/videoDetails/videoDetails';
sessionStorage.removeItem('videoList');
sessionStorage.removeItem('pageInfo');

function App() {
  return (
    <BrowserRouter>
      <Switch >
        <Route path="/login" component={ Login }></Route>
        <Route path="/home" component={ Home }></Route> 
        <Route path="/videoDetails" component={ VideoDetails } ></Route>
        <Redirect from="/" to="/home" />
      </Switch>
    </BrowserRouter>       
  );
}

export default App;
