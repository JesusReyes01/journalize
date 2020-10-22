// import logo from './logo.svg';
import React from 'react';
import './App.scss';
import Nav from './Components/Nav/Nav';
import routes from './routes'
import {withRouter} from 'react-router-dom';

function App(props) {
  return (
    <div className="App">
      {props.location.pathname !== '/'
        ? <Nav/>
        : null} 
      {routes}
    </div>
  );
}

export default withRouter(App);
