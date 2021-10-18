import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import './App.css';

import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => {

  return (
    <div>Hats Page</div>
  )
}
class App extends Component {
  render() {
    return <div className='App'>

      <Switch>

        <Route exact path='/' component={HomePage}/>
        <Route path='/hats' component={HatsPage}/>

      </Switch>

    </div>;
  }
}

export default App;
