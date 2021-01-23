import React, { Component } from 'react';
import {NavLink,Link} from 'react-router-dom';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';

class Navigation extends Component {
    render() { 
      console.log("NavBar",this.props.empID)
        return ( 
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                <NavDropdown title="Main" id="nav-dropdown">
                <NavDropdown.Item href="/Home">Home</NavDropdown.Item>
                 <NavDropdown.Item href="/Aboutus">About Us</NavDropdown.Item>
                    {/* <NavDropdown.Divider />
                     <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                </NavDropdown>
                <NavDropdown title="Transaction" id="nav-dropdown">
                 <NavDropdown.Item href="/OrgChart">Organization Structure</NavDropdown.Item>
                 <NavDropdown.Item href="/Leaverequest">Leave Request</NavDropdown.Item>
                </NavDropdown>
                {/* <NavLink className="d-inline p-2 bg-dark text-white"
                to="/Home">Home</NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white"
                to="/Aboutus">About Us</NavLink> */}
                {/* <NavLink className="d-inline p-2 bg-dark text-white"
                to="/department">Department</NavLink>
                <Link className="d-inline p-2 bg-dark text-white"
                to={{pathname:"/employee",state:{id:this.props.empID}}}>Employee</Link> */}
                  {/* <NavLink className="d-inline p-2 bg-dark text-white"
                to="/EmpOrg">Organization Structure</NavLink> */}
                 {/* <NavLink className="d-inline p-2 bg-dark text-white"
                to={{pathname:"/Leaverequest",state:{id:this.props.empID}}}>Leave Request</NavLink> */}
                  {/* <NavLink className="d-inline p-2 bg-dark text-white"
                to="/">Logout</NavLink> */}
               
                </Nav>
                
                </Navbar.Collapse>
              
            </Navbar>
         );
    }
}
 
export default Navigation;