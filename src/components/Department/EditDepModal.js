import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import configData from "../config.json";
//Importing Snackbar notification
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

class EditDepModal extends Component {
    constructor(props){
        super(props);

        this.state = {snackbaropen:false,snackbarmsg:''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    snackbarClose =(event) =>{
        this.setState({snackbaropen:false});
        };
    
        handleSubmit(event){
          event.preventDefault();
          // alert(event.target.DepartmentName.value);
          
          //consuming post Api method
          fetch(configData.URL+'/departments',{
            method:'PUT',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              departmentID:event.target.DepartmentID.value,
              departmentName: event.target.DepartmentName.value,
              deptLocation:event.target.DepartmentLocation.value
            })
          })
          .then(res=> {res.json()
          if(res.status == 200)
          {
            this.setState({snackbaropen:true,snackbarmsg:'Updated Successfully'});
          }
          else
          {
            this.setState({snackbaropen:true,snackbarmsg:'Update Failed'});
          }
          })
          .then((result)=>{
            // alert(result);
            // console.log(result);
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
                Edit Department
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                  <Col sm={7}>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group style={{display:"none"}} controlId="DepartmentID">
                        <Form.Label>DepartmentID</Form.Label>
                        <Form.Control type="text" name="DepartmentID" required defaultValue={this.props.depid} disabled placeholder="DepartmentID"></Form.Control>
                      </Form.Group>
                      <Form.Group as={Row} controlId="DepartmentName">
                        <Form.Label column sm="5">Department Name</Form.Label>
                        <Col sm="7">
                        <Form.Control type="text" name="DepartmentName" required defaultValue={this.props.depname} placeholder="DepartmentName"></Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="DepartmentLocation">
                        <Form.Label column sm="5">Department Location</Form.Label>
                        <Col sm="7">
                        <Form.Control type="text" name="DepartmentLocation" required defaultValue={this.props.deptLocation} placeholder="DepartmentName"></Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group>
                        <Button className="PoupButtonCss" variant="grey" type="submit">
                          Update Department
                        </Button>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
           
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
           </div>
         );
    }
}
 
export default EditDepModal;