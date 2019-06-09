import React, {Component} from 'react';
import '../App.css';
import HomeHeader from './common/HomeHeader';
import { withRouter } from "react-router-dom";

class HomeScreen extends Component {
    handleSubmit = () => {
          this.props.history.push('/main')
      }
    render(){
        return(
            <div className="App">
            <HomeHeader/>
            <div style={{marginTop:40, marginLeft:400}}>
            {/* Home Text */}
            <div style={{width:700, height: 'fit-content'}}>
            <p className="bigChangeText">Changing the <span style={{fontSize:89, fontWeight: '100' }}>industry</span></p>
            <p  className="oneBlockStyle">one block at a time</p>
            <p className="blockcareTextStyle">Blockcare</p>
    
            <div 
            className='registerButton' 
            style={{marginTop:'9em', width: 321, height: 80, fontSize: 30, borderRadius: 29}}
             onClick= {this.handleSubmit}               
            >START NOW</div>
            </div>
          </div>
          </div>
        );
    }
}

export default withRouter(HomeScreen);