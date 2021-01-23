import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form, Container,  Image} from 'react-bootstrap';
import {BrowserRouter, Route,Switch,withRouter,Router} from 'react-router-dom';
import SwitchPath from '../SwitchPath';
import Navigation from '../Header/Navigation';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Signup from '../Login/Signup';
import ManagerNavigation from '../Header/ManagerNavgiation';
import '../Aboutus.css'
import { CloseOutlined } from '@material-ui/icons';
class Home extends Component {
    // handleClick = () => {

    //     this.props.history.push("/signup");
        
    //  }
    
    constructor(props){
        super(props);

        this.state = {isLoading:true,userdata:[],ApiUrlData:""};
    }

    componentWillMount(){
        localStorage.getItem('currentUser') && this.setState({
            userdata:JSON.parse(localStorage.getItem('currentUser')),
            ApiUrlData:JSON.parse(localStorage.getItem('ApiUrl')),
            isLoading:false
        })
    }

   
    render() { 
        console.log(this.props.location.state);
        console.log("Userdata",this.state.userdata);
        console.log("ApiUrl",this.state.ApiUrlData);
        let comp = "";
        if (this.state.userdata.userRole == 'Employee') {
            comp = <Navigation></Navigation>
          } else {
            comp = <ManagerNavigation></ManagerNavigation>
          }
      
        return ( 
            <div>
            <div className="page-container">
            <Header></Header>
            {comp}
            <div className="content-wrap">
            <div className="container">
   
                {/* <h3 className="m-3 d-flex justify-content-center">
        Employee Management Portal
        </h3> */}
                {/* <Header></Header> */}
                {/* <Navigation empID={this.props.location.state.userID}></Navigation> */}
               {/* {comp} */}
                
            <div className="mt-5 d-flex justify-content-left">
              
                <h3>Welcome to Employee Management Portal!!!</h3>
                    {/* <p>{this.state.userdata.userID}</p> */}
                <br></br>
                <container>
                {/* <h3 style={styleObj}>About Us</h3> */}
                    <Col xs={12} sm={10} smOffset={4}>
                    
                        <Image src="assets/image3.jpg" className="about-profile-pic" rounded />
                      
    
                    </Col>
                    </container>
                {/* <Button type='submit'classname="m-2" onClick={this.handleClick} style={{marginLeft: 30}} variant="danger">Close</Button> */}
                <BrowserRouter>
               
                <Switch>
                <Route path='/signup' component={Signup}></Route>
                </Switch>
               
          </BrowserRouter>
         
               
          </div>
          </div>
        </div>
          <Footer></Footer>
            </div>
            </div>
           
         );
    }
}
 
export default Home;