import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import configData from "../config.json";
//Importing Snackbar notification
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

class DeleteDepModal extends Component {
    constructor(props){
        super(props);
      
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
      event.preventDefault();
      console.log(this.props.depid);

     //Deleting values from Api
      fetch(configData.URL+'/departments/'+this.props.depid,
      {
          method:'DELETE',
          header:{'Accept':'application/json',
          'Content-Type':'application/json'}
      });
     
    }
    

    render() { 
        return (   
            <div className="container">  
            <Modal
            {...this.props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Delete Department
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width:300}}>
                <Row>
                  <Col sm={12}>
                    <Form>
                    <Form.Group controlId="DepartmentID">
                        <Form.Label>Are you sure to delete Department?</Form.Label>
                      </Form.Group>
                      <Form.Group>
                      <Button  variant="primary" onClick={this.handleSubmit} onClickCapture={this.props.onHide}>Confirm</Button>
                      <Button variant="danger" onClick={this.props.onHide} style={{marginLeft: 30}}>Cancel</Button> 
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
           
            </Modal.Body>
          </Modal>
            </div>
            );
    }
}
 
export default DeleteDepModal;