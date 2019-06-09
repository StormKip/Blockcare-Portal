import React from 'react';
import '../../App.css';
import {TiSocialFacebook, TiSocialInstagram, TiSocialTwitter, TiWorld} from 'react-icons/lib/ti/'

const HomeHeader = ()=> {
    return(
        <div className="App-header">
        {/* Menu Buttons*/}
        <div style={{float:'right'}}>
          <a href="https://www.google.com" className="Home-Links">Home</a>
          <a href="https://www.google.com" className="Home-Links">Exchange</a>
          <a href="https://www.google.com" className="Home-Links">About</a>
          <a href="https://www.google.com" className="Home-Links">Doctors</a>
          <a href="https://www.google.com" className="Home-Links">Whitepaper</a>
          <div className = "registerButton">LOGIN</div>
        </div>
        {/* Social Buttons*/}
        <div style={{float:'left', paddingLeft:20}}>
          <a href="https://www.google.com" className="Social-Links"><TiSocialInstagram/></a>
          <a href="https://www.google.com" className="Social-Links"><TiSocialFacebook/></a>
          <a href="https://www.google.com" className="Social-Links"><TiSocialTwitter/></a>
          <a href="https://www.google.com" className="Social-Links"><TiWorld/></a>
        </div>
      </div>
    )
}

export default HomeHeader