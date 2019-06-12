import React, {Component} from 'react';
import './main.css';
import MainHeader from './common/MainHeader';
import loadingPage from './common/loadingPage.svg';
import Swal from 'sweetalert2';
import axios from 'axios';

class MainScreen extends Component {
    // constructor(props){
    //   super(props);
    // }
    state = {
      loading: true,
      doctorId: '',
      patientData:[]
    };
  
  //   getPatients = (doctorId) => {
  //     axios({
  //         method: 'GET',
  //         url: 'https://us-central1-blockcare-3e340.cloudfunctions.net/getPatientsByDoctorId/',
  //         query: { 
  //           id: doctorId
  //          }
  //     }).then((response) => {
  //         let data = response.data
  //         this.setState({ patientData: data })
  //     }).then(()=>{
  //       this.setState({loadingPage:false})
  //     }).catch((response) => {
  //       Swal.fire(
  //         'Error',
  //         'Error while loading patients, likely that no patients exist',
  //         'error'
  //       )
  //     });
  // }

    componentDidMount(){
      let doctorId = this.props.location.query.doctorId;
      console.log('received')
      this.setState({doctorId});
      axios({
        method: 'GET',
        url: 'https://us-central1-blockcare-3e340.cloudfunctions.net/getPatientsByDoctorId/',
        params: { 
          id: doctorId
         }
    }).then((response) => {
        let data = response.data
        this.setState({ patientData: data })
    }).then(()=>{
      this.setState({loading:false})
    }).catch((response) => {
      Swal.fire(
        'Error',
        'Error while loading patients, likely that no patients exist',
        'error'
      )
    });
      
    }

    renderPatientDiv(patient){
      return(
        <div className={'patientDiv'}>
        <div className={'imageDiv'}></div>
        <div className={'textDiv'}>
        <h1 className={'textStyle'}>Name: {patient.firstName}</h1>
        <h1 className={'textStyle'}>Surname: {patient.lastName}</h1>
        <h1 className={'textStyle'}>id: {patient.id}</h1>
        <div className={'viewContainer'}>
        <button className={'viewRecordsButton'}>View Medical Records</button> 
        <h1 className={'numberStyle'}>{patient.medicalRecordsIds.length}</h1>
        </div>
        </div>
        
        </div>
      )
    }

    renderAllPatients(){
      return(
        <div style={{display: 'grid',
          gridTemplateColumns: 'auto auto auto'
      }}>
        {this.state.patientData.map((patient)=>{return this.renderPatientDiv(patient)})}
        </div>
      )
    }

    renderLoading=()=>{
      return(
        <div style={{margin:'0px auto', height:'fit-content', marginTop:250}}><h1>...LOADING...</h1><img src={loadingPage} alt={''}></img></div>
        
      )
    }

    render(){
      const { loading } = this.state;

      // if(loading) { // if your component doesn't have to wait for an async action, remove this block 
      // return null; // render null when app is not ready
      // }
        return(
            <div className={'MainScreen'}>
              <MainHeader/>
              <div style={{height:'93vh', display: 'flex'}}>
              {this.state.loading ? this.renderLoading() : this.renderAllPatients()}
              </div>
          </div>
        );
    }
}

export default MainScreen;