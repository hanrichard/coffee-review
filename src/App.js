import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/layouts/Nav';
import Homepage from './components/layouts/Homepage';
import Shops from './containers/Shops';
// import Shops from './containers/ShopsLanding'
import Reviews from './containers/Reviews';
import ShopDetails from './containers/ShopDetails';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Switch>
            <Route path='/:suburb/:id' component={ShopDetails} />
            <Route exact path='/' component={Homepage} />
            <Route exact path='/reviews/' component={Reviews} />
            <Route exact path='/signin' component={Signin} /> 
            <Route exact path='/signup' component={Signup} /> 
            <Route exact path='/:suburb' component={Shops} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
