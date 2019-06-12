/* eslint no-use-before-define: 0 */  // --> OFF
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import './RegisterLogin.css';
import firebase from '../../Firebase'; 
import axios from 'axios';
import Select from 'react-select';
import loading from '../common/loading.svg'
import Swal from 'sweetalert2'

let firestore = firebase.firestore()

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: 'auto',
    backgroundColor: 'transparent',
    padding: theme.spacing.unit * 4,
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#f6f5f7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontFamily: 'Montserrat, sans-serif',
    height: '62vh',
    margin: '-20px 0 50px'
    }
});

class RegisterLogin extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loadSignUp: false,
      loadSignIn:false,
      open: false,
      active:this.props.active,
      uId:'',
      firstName:'',
      lastName:'',
      specialization:'',
      allDoctorIds:[],
      selectedDoctor:null
    };
    this.handleChange= this.handleChange.bind(this);
  }



  componentWillReceiveProps(){
    console.log(this.props.doctorIds)
    this.setState({allDoctorIds:this.props.doctorIds})
  }
  
  toggleClass() {
    const currentState = this.state.active;
		this.setState({ active: !currentState });
  };

  handleOpen = (active) => {
    this.setState({ open: true, active:active });
  };
  
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value })
  }


  handleClose = () => {
    this.setState({ open: false });
	};
	
	singIn = () =>{
    if (this.state.selectedDoctor !== null){
      console.log(this.state.selectedDoctor.value)
      this.props.history.push({
        pathname: '/main',
        query: {doctorId: this.state.selectedDoctor.value}
      })
    }

  }
	signUp =()=>{
    const {uId, firstName, lastName, specialization} = this.state;
    console.log(uId, firstName, lastName, specialization)
    this.setState({loadSignUp:true});

    axios({
      method:'POST',
      url: 'https://us-central1-blockcare-3e340.cloudfunctions.net/createDoctor/',
      data: {
        id:uId,
        firstName:firstName,
        lastName: lastName,
        specialization: specialization
      }
    }).then((response)=>{
      firestore.collection('DoctorIds').doc(uId).set({
        exists:true
      });
    }).then(()=>{
      Swal.fire(
        'Successfull',
        'You Have successfully registered!',
        'success'
      ).then(()=>{
        this.setState({loadSignUp:false});
        let currentDoctors = this.state.allDoctorIds;
        currentDoctors.push({key:uId,label:uId});
        this.setState({allDoctorIds:currentDoctors,uId:'',firstName:'',lastName:'',specialization:''})
      })
    })
    .catch(() => {
      Swal.fire(
          'Error',
          'Error creating new doctor!.',
          'error'
      ).then(() => {
          this.setState({ loadSubmit: false })
      })
  });

  }
  handleDoctorChange = (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption});
}

loadImage = () => {
  return (
      <img src={loading} alt={''}></img>
  )
}

  render() {
    const { classes } = this.props;
    const { selectedDoctor} = this.state;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <div className={this.state.active ? 'container right-panel-active': 'container'} id="container">
              <div className={'form-container sign-up-container'}>
                <form action="javascript:void(0);">
                  <h1>Create Account</h1>
                  <div className={'social-container'}>
                  <a href="www.facebook.com" className={'social'}><FontAwesomeIcon icon={faFacebookF} size='lg' color="black"/></a>
                    <a href="www.google.com" className={'social'}><FontAwesomeIcon icon={faGooglePlusG} size='lg' color="black"/></a>
                    <a href="www.linkedin.com" className={'social'}><FontAwesomeIcon icon={faLinkedinIn} size='lg' color="black"/></a>
                  </div>
                  <span>Enter Your Personal Details</span>
                  <input type="text" placeholder="Unique Id" id={'uId'} value={this.state.uId} onChange={this.handleChange}/>
                  <input type="text" placeholder="First Name" id={'firstName'} value={this.state.firstName} onChange={this.handleChange}/>
                  <input type="text" placeholder="Last Name" id={'lastName'} value={this.state.lastName} onChange={this.handleChange}/>
                  <input type="text" placeholder="Specialization" id={'specialization'} value={this.state.specialization} onChange={this.handleChange}/>          
                   <button onClick = {this.signUp}>{this.state.loadSignUp === true ? this.loadImage() : 'SignUp'}</button>
                </form>
             </div>
              <div className={'form-container sign-in-container'}>
                <form action="javascript:void(0);">
                  <h1>Sign in</h1>
                  <div className={'social-container'}>
                    <a href="www.facebook.com" className={'social'}><FontAwesomeIcon icon={faFacebookF} size='lg' color="black"/></a>
                    <a href="www.google.com" className={'social'}><FontAwesomeIcon icon={faGooglePlusG} size='lg' color="black"/></a>
                    <a href="www.linkedin.com" className={'social'}><FontAwesomeIcon icon={faLinkedinIn} size='lg' color="black"/></a>
                  </div>
                  <span>or use your account</span>
                  <div style={{width: '243px',padding: '21px'}}>
                  <Select
                                classNamePrefix='react-select'
                                value={selectedDoctor}
                                searchable={false}
                                onChange={this.handleDoctorChange}
                                options={this.state.allDoctorIds}
                                placeholder = {'Select Doctor ID'}
                            />
                            </div>
                  
                  <a href="www.firebase.com">Forgot your password?</a>
                  {/* <Link href="/register"> */}
									<button onClick = {this.singIn}>{this.state.loadSignIn === true ? this.loadImage() : 'SignIn'}</button>
									{/* </Link> */}
                </form>
              </div>
              <div className={'overlay-container'}>
                <div className={'overlay'}>
                  <div className={'overlay-panel overlay-left'}> 
                    <h1>Welcome Back!</h1>
                    <p>
                    Login now and view your patients!
                    </p>
                    <button className={"ghost"} id="signIn" onClick={()=>{this.toggleClass()}}>Sign In</button>
                  </div>
                  <div className={'overlay-panel overlay-right'}>
                    <h1>Hi!</h1>
                    <p>New to this? Create a Blockcare Admin account</p>
                    <button className={"ghost"} id="signUp"  onClick={()=>{this.toggleClass()}}>Sign Up</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

RegisterLogin.propTypes = {
  classes: PropTypes.object.isRequired,

};

// We need an intermediary variable for handling the recursive nesting.
// const RegisterLoginWrapped = withStyles(styles)(RegisterLogin);

export default withStyles(styles)(RegisterLogin);