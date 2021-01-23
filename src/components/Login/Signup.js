import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {BrowserRouter, Route,Switch,withRouter,Router} from 'react-router-dom';
import hashHistory from 'react-router'
import SwitchPath from '../SwitchPath';
import Home from '../Home/Home'
import Header from '../Header/Headerlogin';
import Footer from '../Footer/Footer';
//Importing Snackbar notification
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import configData from "../config.json";

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

class Signup extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.state = {deps:[],snackbaropen:false,snackbarmsg:'',
    emailAddress: "",
    password: "",
    passwordConfirmation: "",
    emailAddressError: "",
    passwordError: "",
    passwordConfirmationError: "",
  };
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateEmailAddress = this.validateEmailAddress.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validatePasswordConfirmation = this.validatePasswordConfirmation.bind(
          this
        );
        this.validateField = this.validateField.bind(this);
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

  handleSubmit = (event) => {
    event.preventDefault();
    
          //consuming post Api method
          fetch(configData.URL+'/userdetails',{
            method:'POST',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserID:0,
                EmailID: event.target.emailAddress.value,
                ProfilePassword: event.target.password.value,
                UserRole: event.target.UserRole.value
            })
          })
          .then(res=> res.json())
          .then((result)=>{
            // alert(result);
            this.setState({snackbaropen:true,snackbarmsg:'Signup Successful.'});
          },
          (error)=>{
            //alert('Failed')
            this.setState({snackbaropen:true,snackbarmsg:'Signup Failed'});
          }
          )
    // this.props.history.push('/Home');
    // console.log(event.target.EmailID.value);
    // console.log(event.target.ProfilePassword.value);
    // console.log(event.target.UserRole.value);
    
 }

 snackbarClose =(event) =>{
  this.setState({snackbaropen:false});
  };

  validateField(name) {
    let isValid = false;

     if (name === "emailAddress") isValid = this.validateEmailAddress();
    else if (name === "password") isValid = this.validatePassword();
    else if (name === "passwordConfirmation")
      isValid = this.validatePasswordConfirmation();
    return isValid;
  }
  
  validateEmailAddress() {
    let emailAddressError = "";
    const value = this.state.emailAddress;
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
    const value = this.state.password;
    if (value.trim === "") passwordError = "Password is required";
    else if (!passwordValidator.test(value))
      passwordError =
        "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";

    this.setState({
      passwordError
    });
    return passwordError === "";
  }

  validatePasswordConfirmation() {
    let passwordConfirmationError = "";
    if (this.state.password !== this.state.passwordConfirmation)
      passwordConfirmationError = "Password does not match";

    this.setState({
      passwordConfirmationError
    });
    return passwordConfirmationError === "";
  }

    render() { 
        return (        
   <body >
     <div>
     <Header></Header>
 
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
                <Row className="Signin"> 
                {/* <h2 className="m-3 d-flex justify-content-center">
         Employee Management Portal
        </h2> */}
        <hr></hr>
                <h3>Sign Up</h3>              
                  <p>Please fill this form to create an account.</p>      
                  <Col  sm={4}>
              
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group as={Row} controlId="emailAddress">
                        <Form.Label className ="fontSizesm" column sm="3">Email<sup className="RequireFiledCss">*</sup></Form.Label>
                        <Col sm="9">
                        <input type="text" id="emailAddress" className="form-control inlineFlexSignup" type="text" name="emailAddress" required placeholder="Enter Email" 
                           value={this.state.emailAddress}
                           onChange={this.handleChange}
                           onBlur={this.handleBlur}
                           autoComplete="off"  ></input> 
                            {this.state.emailAddressError && (
              <div className="validationTextSignup">{this.state.emailAddressError}</div>
            )}             
                      </Col>              
                      </Form.Group>
                      <Form.Group as={Row} controlId="password">
                        <Form.Label className ="fontSizesm" column sm="3">Password<sup className="RequireFiledCss">*</sup></Form.Label>
                        <Col sm="9">
                        <input type="text" id="password" className="form-control inlineFlexSignup" type="password" name="password" required placeholder="Enter Password" 
                         value={this.state.password}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            autoComplete="off"></input>
              {this.state.passwordError && (
              <div className="validationTextSignup">{this.state.passwordError}</div>
            )}
            </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="passwordConfirmation">
                        <Form.Label className ="fontSizesm" column sm="6">Confirm Password<sup className="RequireFiledCss">*</sup></Form.Label>
                        <Col sm="6">
                        <Form.Control className="cofirmpasstxt" type="password" name="passwordConfirmation" required placeholder="Confirm Password" 
                          value={this.state.passwordConfirmation}
                          onChange={this.handleChange}
                          onBlur={this.handleBlur}
                          autoComplete="off"></Form.Control>
            {this.state.passwordConfirmationError && (
              <div className="validationTextSignup">
                {this.state.passwordConfirmationError}
              </div>
            )}
            </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="UserRole">
                        <Form.Label className ="fontSizesm" column sm="3">Role</Form.Label>
                        <Col sm="9">
                        <Form.Control className="inlineFlexSignup" as="select">
                            <option id="1">Employee</option>
                            <option id="2">Manager</option>
                        </Form.Control> 
                        </Col> 
                      </Form.Group>
                      <Form.Group>
                        <Button id ="signupButton" className="ButtonCssLogin" variant="grey" type="submit">
                        Sign Up
                         </Button>
                        <Button id ="closeButton" className="ButtonCssclose" variant="danger" onClick={event =>  window.location.href='/'} style={{marginLeft: 30}}>Close</Button>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
                
                {/* <Footer></Footer> */}
      </div>
      <Footer></Footer>
      </div>
      </body>
           
         );
    }
}
 
export default Signup;