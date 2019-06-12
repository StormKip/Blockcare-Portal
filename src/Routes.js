import React from 'react';
import {Route} from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import MainScreen from './components/main';

class Routes extends React.Component {

  render(){
  return(
    <div>
      <Route exact path="/" component={HomeScreen}/>
      <Route path="/main" component ={MainScreen}/>
    </div>
  )
}
}

export default Routes;
