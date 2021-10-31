import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.util';
import { setCurrentUser } from './redux/user/user.actions';

class App extends Component {


  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if(userAuth) {

        const snapshot = await createUserProfileDocument(userAuth);

        setCurrentUser({
          id: userAuth.uid,
          ...snapshot
        });

      } else {
        
        setCurrentUser( null );
      }
      
    });
  }

  componentWillUnmount() {

    this.unsubscribeFromAuth.unsubscribeFromAuth();
  }

  render() {
    return <div className='App'>

      <Header />
      <Switch>

        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)}/>

      </Switch>

    </div>;
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
