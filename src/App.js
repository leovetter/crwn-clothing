import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

class App extends Component {
  render() {
    return <div className='App'>

      <Header />
      <Switch>

        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>

      </Switch>

    </div>;
  }
}

export default App;
