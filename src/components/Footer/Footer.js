import React from 'react';
import "./Footer.css"

const Footer = () => {
    return(
        <div className="main-footer">
        <div className="container">
           <div className="row">
          
        <div className="col"> 
        <h5> LTI </h5>
        <ul className="list-unstyled">
        <li>326 Mindspace</li>
        <li>Mumbai, India</li>
        
        

        </ul>
        </div>


        <div className="col">
            <h6>HELP</h6>
            <ul className="list-unstyled">
                <li>Call Services</li>
            
                <li>FAQ</li>
            </ul>
        </div>


        <div className="col">
            <h6>CONTACT US</h6>
            <ul className="list-unstyled">
                <li>About Us</li>
                <li>Services</li>
                
            </ul>
        </div>

            </div> 
        <hr/>
            <div className="row">
            <p className="col-sm">
        &copy;{new Date().getFullYear()} LNTINFO INC | All rights reserved | Terms Of Service | Privacy
            </p>

            </div>
        </div>
          
        </div>
    )
}

export default Footer;