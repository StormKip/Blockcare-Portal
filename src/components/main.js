import React, {Component} from 'react';
import './main.css';
import MainHeader from './common/MainHeader';

class MainScreen extends Component {

    render(){
        return(
            <div className={'MainScreen'}>
              <MainHeader/>
              <div>
              <div className={'patientDiv'}></div>
              <div className={'patientDiv'}></div>
              <div className={'patientDiv'}></div>
              <div className={'patientDiv'}></div>
              <div className={'patientDiv'}></div>
              </div>
          </div>
        );
    }
}

export default MainScreen;