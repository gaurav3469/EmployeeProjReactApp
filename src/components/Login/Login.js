import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import configData from "../config.json";
//Importing Snackbar notification
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Header from '../Header/Headerlogin';
import Footer from '../Footer/Footer';

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;


class Login extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.state = {userdata:[],snackbaropen:false,snackbarmsg:'',
    EmailID: "",
    Password: "",
    // passwordConfirmation: "",
    emailAddressError: "",
    passwordError: "",
    // passwordConfirmationError: "",
  };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validateEmailAddress = this.validateEmailAddress.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateField = this.validateField.bind(this);
  }

  componentWillUpdate(nextProps,nextState){
    localStorage.setItem('currentUser',JSON.stringify(nextState.userdata));
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });

    return;
  }

  handleBlur(event) {
    const { name } = event.target;

    this.validateField(name);
    return;
  }

  validateField(name) {
    let isValid = false;

     if (name === "EmailID") isValid = this.validateEmailAddress();
    else if (name === "Password") isValid = this.validatePassword();
    // else if (name === "passwordConfirmation")
    //   isValid = this.validatePasswordConfirmation();
    // return isValid;
  }
  
  validateEmailAddress() {
    let emailAddressError = "";
    const value = this.state.EmailID;
    if (value.trim === "") emailAddressError = "Email Address is required";
    else if (!emailValidator.test(value))
      emailAddressError = "Email is not valid";

    this.setState({
      emailAddressError
    });
    return emailAddressError === "";
  }

  validatePassword() {
    let passwordError = "";
    const value = this.state.Password;
    if (value.trim === "") passwordError = "Password is required";
    else if (!passwordValidator.test(value))
      passwordError =
        "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";

    this.setState({
      passwordError
    });
    return passwordError === "";
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(configData.URL+'/userdetails/'+event.target.EmailID.value)
    .then(response=> response.json())
    .then(data=> {
        this.setState({
          userdata:data,        
        });
        
        if(this.state.userdata.emailID == this.state.EmailID && this.state.userdata.profilePassword == event.target.Password.value){
          this.props.history.push('/Home')
        //   this.props.history.push({​​​​​​​​
        //     pathname: '/Home',
        //     state: {​​​​​​​​ data: this.state.userdata.employeeID }​​​​​​​​
        //   }​​​​​​​​)
        // this.props.history.push({ 
        //   pathname: '/Home',
        //   state: this.state.userdata
        //  });
        }
        else
        {
          this.setState({snackbaropen:true,snackbarmsg:'Login Failed'});
        }
        console.log(data);
    }  
    );
    
  }

  snackbarClose =(event) =>{
    this.setState({snackbaropen:false});
    };
  
    snackbarClose =(event) =>{
      this.setState({snackbaropen:false});
      };

    render() { 
      const{EmailID,Password,Role}=this.state;
      // const SERVER_URL = process.env.REACT_APP_SERVER_URL;
      // console.log(SERVER_URL);
        return ( 

          <div className="page-container">
            <Header></Header>
          <div className="content-wrap">
          <div className="container">
          <Snackbar anchorOrigin={{vertical:'center',horizontal:'center'}}
             open={this.state.snackbaropen}
             autoHideDuration={3000}
             onClose={this.snackbarClose}
             message={<span id="message-id">{this.state.snackbarmsg}</span>}
             action={[
               <IconButton key="close"
               arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}> x</IconButton>
             ]}>
              
             </Snackbar>
             {/* <Header></Header> */}
                <Row className="Signin marginCss"> 
                {/* <h2 className="m-3 d-flex justify-content-center">
         Employee Management Portal
        </h2> */}
       
                <h3> <img
            src="assets/login.jpg"  rounded
            alt="Login"
          /></h3> 
                  <Col sm={4} className="marginCSSLogin">
        
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group as={Row} controlId="EmailID">
                        <Form.Label column sm="3">Email<sup className="RequireFiledCss">*</sup></Form.Label>
                        <Col sm="9">
                        <Form.Control className="inlineFlexLogin" type="text" name="EmailID" required placeholder="Enter Email" 
                         value={this.state.EmailID}
                         onChange={this.handleChange}
                         onBlur={this.handleBlur}
                         autoComplete="off"></Form.Control>             
                          {this.state.emailAddressError && (
              <div className="validationTextLogin">{this.state.emailAddressError}</div>
            )}                 
            </Col>                     
                      </Form.Group>
                      <Form.Group as={Row} controlId="Password">
                        <Form.Label  column sm="3">Password<sup className="RequireFiledCss">*</sup></Form.Label>
                        <Col sm="9">
                        <Form.Control className="inlineFlexLogin" type="password" name="Password" required placeholder="Enter Password" 
                          value={this.state.Password}
                          onChange={this.handleChange}
                          onBlur={this.handleBlur}
                          autoComplete="off"></Form.Control>
                              {this.state.passwordError && (
              <div className="validationTextLogin">{this.state.passwordError}</div>
            )}
            </Col>
                      </Form.Group>
                      <Form.Group style={{display:"none"}} as={Row} controlId="EmpRole">
                        <Form.Label column sm="3">Role</Form.Label>
                        <Col sm="9">
                        <Form.Control className="inlineFlexLogin" as="select">
                            <option id="1">Employee</option>
                            <option id="2">Manager</option>
                        </Form.Control> 
                        </Col> 
                      </Form.Group>
                      <Form.Group>
                        <Button className="ButtonCssLogin" variant="grey" type="submit">
                        Login
                        </Button>
                        <Button className="ButtonCssLogin" variant="grey" onClick={event =>  window.location.href='/Signup'} classname="m-2" style={{marginLeft: 30}}>Signup</Button>

                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
               
      </div>
   </div>
   <Footer></Footer>
   </div>
         );
    }
}
 
export default Login;