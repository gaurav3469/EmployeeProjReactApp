import React, { Component } from 'react';

import {Navbar,Nav} from 'react-bootstrap';

import {Col, Container,  Image} from 'react-bootstrap';
import '../Aboutus.css';

class Headerlogin extends Component {
    

    render() { 
        return ( 

<Navbar collapseOnSelect expand="lg" className="main-footer" >
  
  <Image src="assets/LTI.png" className="about-logo" rounded />
   <h2 className="m-3 d-flex justify-content-center">
  
         Employee Management Portal
         </h2>
         
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
     <Nav className="mr-auto">
      
      
    
    </Nav> 
    
    <Nav>
        

     
   
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
         );
    }
}
 
export default Headerlogin;