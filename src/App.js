import React, { Component } from 'react';
import './app.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/layouts/Nav';
import Homepage from './components/layouts/Homepage';
import Shops from './containers/Shops';
import Findme from './containers/Findme';
import Reviews from './containers/Reviews';
import ShopDetails from './containers/ShopDetails';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import styled from 'styled-components'
import componentStyle from './appStyle';

class App extends Component {
  render() {
    const Wrapper = styled.div`${componentStyle}`;
    
    return (
      <BrowserRouter>
        <Wrapper className="App">
          <Nav />
          <Switch>
            <Route path='/:suburb/:id' component={ShopDetails} />
            <Route exact path='/' component={Homepage} />
            <Route exact path='/reviews/' component={Reviews} />
            <Route exact path='/signin' component={Signin} /> 
            <Route exact path='/signup' component={Signup} /> 
            <Route exact path='/findme' component={Findme} /> 
            <Route exact path='/:suburb' component={Shops} />
          </Switch>
        </Wrapper>
      </BrowserRouter>
    );
  }
}


export default App