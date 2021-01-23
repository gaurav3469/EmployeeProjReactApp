import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Col, Container,  Image} from 'react-bootstrap';
import "../Aboutus.css";
import Person from './Person';

class Header extends Component {
    constructor(props){
        super(props);

        this.state = {isLoading:true,userdata:[],isDisplay:"block"};
       
    }
    componentDidMount(){
        localStorage.getItem('currentUser') && this.setState({
            userdata:JSON.parse(localStorage.getItem('currentUser')),
            isLoading:false
        })
    }


    render() { 
        return ( 
//             <Navbar className="HeaderCss" expand="lg">
//   <Image src="assets/LTI.png" className="about-logo" rounded />
//   <h2 className="m-3 d-flex justify-content-center">
//          Employee Management Portal
//         </h2>
//   <Navbar.Toggle aria-controls="basic-navbar-nav" />
//   <Navbar.Collapse id="basic-navbar-nav">
//         <h5 style={{display:this.state.isDisplay}}>{this.state.userdata.employeeName}</h5>
//         {/* <Button positionvariant="outline-success float-right pull-right" onClick={this.handleSubmit}>
//             Log Out
//         </Button> */}
//       {/* <Button positionvariant="outline-success float-right pull-right" onClick={
//           this.setState({isDisplay:"none"}),
//           event =>  window.location.href='/'}>Log Out</Button> */}
     
   
//   </Navbar.Collapse>
// </Navbar>
<Navbar collapseOnSelect expand="lg" className="main-footer" >
  {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
  <Image src="assets/LTI.png" className="about-logo" rounded />
   <h2 className="m-3 d-flex justify-content-center">
  
         Employee Management Portal
         </h2>
         
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
     <Nav className="mr-auto">
      
      
    
    </Nav> 
    
    <Nav>
        
<h6 className="m-2 d-flex justify-content-end">Welcome {this.state.userdata.employeeName}</h6>
     
   
    </Nav>
    <Person></Person>
  </Navbar.Collapse>
</Navbar>
         );
    }
}
 
export default Header;