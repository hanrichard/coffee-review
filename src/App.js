import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/layouts/Nav';
import Homepage from './components/layouts/Homepage'
import Shops from './containers/Shops'
import Reviews from './containers/Reviews'
import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import ShopDetails from './components/shops/ShopDetails'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/shops/' component={Shops} />
            <Route exact path='/reviews/' component={Reviews} />
            <Route path='/shops/:id' component={ShopDetails} />
            <Route path='/signin' component={Signin} /> 
            <Route path='/signup' component={Signup} /> 
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
