import React from 'react';
import '../main.css'; //
import {MdMenu, MdSearch} from 'react-icons/lib/md/'
import bLogo from '../../Assets/bLogo.svg';

class MainHeader extends React.Component {
  render(){  
  return(
      <div className="MainHeader">
        <div style={{float:'left'}}>
        <MdMenu style={{color:'#BCBCCB', paddingLeft:25}}/>   
      <div style={{width:100, height: '60%', display:'contents',  color: '#C1C1C1', fontSize: 16}}><MdSearch style={{color:'#BCBCCB', paddingLeft:25}}/>Search </div>
        </div>
     <img src={bLogo} style={{width:38, display:38, marginLeft: 'auto', marginRight:'auto', display:'block'}}/>
     <div style={{float:'right', width:200, color:'black'}}>
       Right Contents
     </div>
      </div>
          
    )
  }
}

export default MainHeader;