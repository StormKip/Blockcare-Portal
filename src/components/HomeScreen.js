import React, {Component} from 'react';
import '../App.css';
import HomeHeader from './common/HomeHeader';
import { withRouter } from "react-router-dom";
import RegisterLogin from './RegisterLogin/RegisterLogin';
import firebase from '../Firebase';
let firestore = firebase.firestore()

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.RegisterLogin = React.createRef();
    this.state = {
        active: true,
        doctorIds: []
    }
    this.startNow = this.startNow.bind(this)
}

async componentWillMount(){
  let doctorCollection = firestore.collection("DoctorIds");
  let snapshot = await doctorCollection.get()
  let doctorIds = []
  snapshot.forEach((doc)=>{
    doctorIds.push({value:doc.id, label:doc.id})
  })
  console.log(doctorIds);
  this.setState({doctorIds})
}

startNow = () => {
    this.setState({ active: true })
    this.RegisterLogin.current.handleOpen(true)
}
loginNow = () => {
    this.setState({ active: false })
    this.RegisterLogin.current.handleOpen(false)
}
    
    render(){
        return(
            <div className="App">
            <HomeHeader loginCallback={this.loginNow.bind(this)}/>
            <div style={{marginTop:40, marginLeft:400}}>
            {/* Home Text */}
            <div style={{width:700, height: 'fit-content'}}>
            <p className="bigChangeText">Changing the <span style={{fontSize:89, fontWeight: '100' }}>industry</span></p>
            <p  className="oneBlockStyle">one block at a time</p>
            <p className="blockcareTextStyle">Blockcare</p>
    
            <div 
            className='registerButton' 
            style={{marginTop:'3em', width: 321, height: 80, fontSize: 30, borderRadius: 29}}
             onClick= {this.startNow}               
            >START NOW</div>
            </div>
          </div>
          <RegisterLogin innerRef={this.RegisterLogin} history={this.props.history} doctorIds={this.state.doctorIds}/>
          </div>
        );
    }
}

export default withRouter(HomeScreen);