import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.util';

class App extends Component {

  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if(userAuth) {

        const snapshot = await createUserProfileDocument(userAuth);

        this.setState({ currentUser: {
          id: userAuth.uid,
          ...snapshot
        } });

      } else {
        
        this.setState({ currentUser: null });
      }

        console.log('state')
        console.log(this.state)
      
    });
  }

  componentWillUnmount() {

    this.unsubscribeFromAuth.unsubscribeFromAuth();
  }

  render() {
    return <div className='App'>

      <Header currentUser={this.state.currentUser} />
      <Switch>

        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route path='/signin' component={SignInAndSignUp}/>

      </Switch>

    </div>;
  }
}

export default App;
