import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import configData from "../config.json";

class DeleteEmpModal extends Component {
    constructor(props){
        super(props);
      
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.props.empid);

        //Deleting values from Api
        fetch(configData.URL+'/employees/'+this.props.empid,
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
                Delete Employee
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width:300}}>
                <Row>
                  <Col sm={12}>
                    <Form>
                    <Form.Group controlId="EmployeeID">
                        <Form.Label>Are you sure to delete Employee?</Form.Label>
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
 
export default DeleteEmpModal;