import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import configData from "../config.json";
//Importing Snackbar notification
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class AddEmpModal extends Component {
    constructor(props){
        super(props);

        this.state = {deps:[],snackbaropen:false,snackbarmsg:'', EmailID:"",emailAddressError: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validateEmailAddress = this.validateEmailAddress.bind(this);
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

    validateField(name) {
      let isValid = false;
  
       if (name === "EmailID") isValid = this.validateEmailAddress();
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

    //Collecting all department details using api which can be used as value for Department drop-down list
    componentDidMount(){
        fetch(configData.URL+'/departments')
        .then(response=> response.json())
        .then(data=> {
            this.setState({
                deps:data
            });
        }  
        );
    }

    snackbarClose =(event) =>{
        this.setState({snackbaropen:false});
        };
    
        handleSubmit(event){
          event.preventDefault();
          // alert(event.target.DepartmentName.value);
    
          //consuming post Api method
          fetch(configData.URL+'/employees',{
            method:'POST',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              employeeID:0,
              employeeName: event.target.EmployeeName.value,
              department: event.target.Department.value,
              mailID: event.target.EmailID.value,
              doj: event.target.DOJ.value
            })
          })
          .then(res=> {res.json()
            if(res.status == 201)
            {
              this.setState({snackbaropen:true,snackbarmsg:'Added Successfully'});
            }
            else
            {
              this.setState({snackbaropen:true,snackbarmsg:'Operation Failed'});
            }
          })
          .then((result)=>{
            // alert(result);
            // this.setState({snackbaropen:true,snackbarmsg:result});
          },
          (error)=>{
            //alert('Failed')
            // this.setState({snackbaropen:true,snackbarmsg:'Failed'});
          }
          )
        }
    render() { 
        return (  
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
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Employee
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
                <Row>
                  <Col sm={8}>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group  as={Row} controlId="EmployeeName">
                        <Form.Label column sm="4">Employee Name</Form.Label>
                        <Col sm="8">
                        <Form.Control type="text" name="EmployeeName" required placeholder="EmployeeName"></Form.Control>
                        </Col>                        
                      </Form.Group>
                      <Form.Group as={Row} controlId="Department">
                        <Form.Label column sm="4">Department</Form.Label>
                        {/* <Form.Control type="text" name="Department" required placeholder="Department"></Form.Control> */}
                        
                        {/* Creating Drop-down */}
                        <Col sm="8">
                        <Form.Control as="select">
                            {this.state.deps.map(dep=> 
                            <option key={dep.departmentID}>{dep.departmentName}</option>
                                )}
                        </Form.Control>   
                        </Col>                     
                      </Form.Group>
                      <Form.Group  as={Row} controlId="EmailID">
                        <Form.Label  column sm="4">Email</Form.Label>
                        <Col sm="8">
                        <Form.Control type="text" name="EmailID" required placeholder="Email"
                         value={this.state.EmailID}
                         onChange={this.handleChange}
                         onBlur={this.handleBlur}
                         autoComplete="off"
                        ></Form.Control>
                        {this.state.emailAddressError && (
              <div className="validationTextPopup">{this.state.emailAddressError}</div>
            )}                 
                        </Col>
                      </Form.Group>
                      <Form.Group  as={Row} controlId="DOJ">
                        <Form.Label column sm="4">DOJ</Form.Label>
                        <Col sm="8">
                        <Form.Control type="date" name="DOJ" required placeholder="DOJ"></Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group>
                        <Button className="PoupButtonCss" variant="grey" type="submit">
                          Add Employee
                        </Button>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
           
            </Modal.Body>
            <Modal.Footer>
              <Button variant='danger' onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
           </div>
        );
    }
}
 
export default AddEmpModal;