import React from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import MainScreen from './components/main';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
     <HomeScreen/>
     <Route path="/" exact component={HomeScreen} />
        <Route path="/main/" component={MainScreen} />
    </Router>
  );
}

export default App;
