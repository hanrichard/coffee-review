import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/layouts/Nav';
import Homepage from './components/layouts/Homepage';
import Shops from './containers/Shops';
import Findme from './containers/Findme';
import Reviews from './containers/Reviews';
import ShopDetails from './containers/ShopDetails';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import styled from 'styled-components';
// import index from 'styled-components';

class App extends Component {
  render() {
    const Wrapper = styled.div`
        
      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
          monospace;
      }

      select {
        display: block;
      }

      .select-wrapper {
        display: flex;
        justify-content: flex-end
      }
      .select {
        display: block;
        width: 200px;
        text-align: right;
      }
      
      .reviewCard {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid black;

        &:last-child {
          border-bottom: 0;
        }
      }

      .reviewCard-user {
        display: flex
      }

      .reviewCard-content {
        display: block
      }

      .shopReview {
        display: inline-flex;
        align-items: center;
        align-content: center;
        width: 100px;
        border: 1px solid black;
        border-radius: 100px;
        height :100px;
        flex-direction: column;
        justify-content: center;
        margin-left: 50px;
      }

      .reviewTotal-card-titile {
        display: flex;
        align-items: center;
      }

      .shopReview-total .StarRatingComponent-wrapper{
        margin: 0;
      }

      .review-small {
        margin-top: 15px;
        font-size: 12px;
        font-weight: 100;
      }

      .login-page {
        margin: 50px auto;
        padding: 10px;
      }

      .simplemap {
        position: relative;
      }
    `

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

export default App;
