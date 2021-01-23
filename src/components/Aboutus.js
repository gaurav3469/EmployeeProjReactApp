import React, { Component } from 'react';
import {Col, Container,  Image} from 'react-bootstrap';
import './Aboutus.css';
import Navigation from './Header/Navigation';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ManagerNavigation from './Header/ManagerNavgiation';
class Aboutus extends Component {
    constructor(props){
        super(props);

        this.state = {isLoading:true,userdata:[]};
    }

    componentWillMount(){
        localStorage.getItem('currentUser') && this.setState({
            userdata:JSON.parse(localStorage.getItem('currentUser')),
            isLoading:false
        })
    }
    
    render() { 
        const styleObj = {
           
            textAlign: "center",
         
        }
        let comp = "";
        if (this.state.userdata.userRole == 'Employee') {
            comp = <Navigation></Navigation>
          } else {
            comp = <ManagerNavigation></ManagerNavigation>
          }
        return ( 
            <div>
                 <Header></Header>
                 {comp} 
            <div className="container">
            {/* <h3 className="m-3 d-flex justify-content-center">
    Employee Management Portal
    </h3> */}
            {/* <Header></Header> */}
           {/* {comp} */}
            
            {/* <div className="mt-5 d-flex justify-content-left"></div> */}
                {/* <h2>About Us </h2>
                <Image src="assets/images.jpg" className="header-image" /> */}
                <container>
               
                    {/* <Col xs={12} sm={10} smOffset={4}> */}
                    <br></br>
                    <h3 style={styleObj}>About Us</h3>
            <Image src="assets/images.jpg" className="about-profile-pic" rounded />
                        
                      
                        <p>Our Employee Management portal an online employee engagement platform that puts a range of HR services at the employee’s fingertips. 
                        From providing employees with access to helpful HR content and self-service functionality that answers their questions,
                         to support and case tracking.
                         An Employee Portal enhances the employee service experience,
                          which increases employee satisfaction and engagement levels.</p>
                         <p> It is also a communications and change management tool, enabling HR to effectively engage with their employees and support the management
                          of change and development within the organization.
                          Additional benefits include increased workforce productivity and greater efficiency of HR operations.</p>
                        <p>For more enquiries please contact us at empman@gmail.com</p>
                    {/* </Col> */}
                    </container>
                </div>
                <Footer></Footer>
                </div>
          
         );
    }
}
 
export default Aboutus;