import React, { Component } from 'react';
import {Table, Button, Row, Col, Form,Image} from 'react-bootstrap';
import FileUpload from './FileUpload';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navigation from '../Header/Navigation';
import moment from 'moment';
import ManagerNavigation from '../Header/ManagerNavgiation';
//Importing Snackbar notification
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import configData from "../config.json";

interface userdata {
  emailID: string,
     employeeID: number,
    employeeName: string,
    profilePassword: string,
    userID: number,
    userRole: string
}

class LeaveRequest extends Component<userdata> {
  state={
    LeaveType: null,
    StartDate: null,
    EndDate: null,
    TLeaves: null,
    EmployeeID:0,
    userRole:"",
    d1:0,
    d2:0,
    diff:0,
    isTable:"none",
    snackbaropen:false,
    snackbarmsg:'',
    userInfo:null,
    isLoading:true,
    // userdata:[{
    //   emailID: "",
    //  employeeID: null,
    // employeeName: "",
    // profilePassword: "",
    // userID: 0,
    // userRole: ""
    // }],
    leaves:[
      {
        leaveID:"",
        employeeID:"",
        leaveType:"",
        lStartDate: "",
        lEndDate:"",
        leaveDays:"",
        leaveStatus:""

      }
    
    ]
  
  };


 
  
  constructor(props:any){
    super(props);
    // this.state.EmployeeID = props.location.state.id;
    // localStorage.setItem('rememberMe', this.state.EmployeeID);
    // console.log("Employee ID:",localStorage.getItem('rememberMe'));
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.GetValue = this.GetValue.bind(this);
  }
  
  
  componentDidMount(){
   
      let obj:userdata = JSON.parse(localStorage.getItem('currentUser') || '{}');

    console.log("userInfo",obj.employeeID);
    this.state.EmployeeID=obj.employeeID;
    this.state.userRole = obj.userRole;
    console.log("Emp",this.state.userRole);
}

  handleChange(event:any) {
    let d1 = Date.now();
    if(event.target.name == "StartDate")
    {
      this.state.StartDate = event.target.value;
      this.state.d1 = new Date(event.target.value).getDate();
     
    }
    else if(event.target.name == "EmpolyeeID")
    {
      this.state.EmployeeID = event.target.value;
    }
    else
    {
      this.state.EndDate = event.target.value;
      this.state.d2 = new Date(event.target.value).getDate();
    }
    console.log(event);
    return;
  }
  GetValue(event:any) {
    if(this.state.d1 > this.state.d2)
    {
      window.alert("End date can't be less than start date");
    }
    else{
      this.state.diff = this.state.d2 - this.state.d1;
   event.target.value = this.state.diff + 1;
    console.log(this.state.diff);
    console.log(this.state.StartDate,this.state.EndDate);
    }
   
  }

  handleSubmit(event:any){
    event.preventDefault();
    // alert(event.target.DepartmentName.value);
    // console.log("event", event.target.TLeaves.value);
   // consuming post Api method
    fetch(configData.URL+'/LeaveDetails',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        leaveID:0,
        employeeID: this.state.EmployeeID,
        leaveType: event.target.LeaveType.value,
        lStartDate: this.state.StartDate,
        lEndDate:this.state.EndDate,
        leaveDays:event.target.TLeaves.value,
        docPath:"default",
        leaveStatus:"Submitted"
      })
    })
    .then(res=> {res.json()
      console.log(res);
      if(res.status == 201)
      {
        window.alert("Leave Submitted Successfully");
        this.setState({snackbaropen:true,snackbarmsg:'Leave Applied Successfully'});
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

  handleHistory =() =>{
    this.setState({isTable:"block"});
        //Consuming values from Api (GET method)
        fetch(configData.URL+'/LeaveDetails/'+this.state.EmployeeID)
        .then(response=> response.json())
        .then(data=> {
            this.setState({
                leaves:data          
            });
            console.log(data);
        }  
        );
  };



  snackbarClose =() =>{
    this.setState({snackbaropen:false});
    };

    render() { 
      // console.log(this.props.location.state);
      const{leaves}=this.state;
      let comp:any;
      if(this.state.userRole =='Employee') {
          comp = <Navigation></Navigation>
        } else {
          comp = <ManagerNavigation></ManagerNavigation>
        }
        return ( 
          <div className="page-container">
          <Header></Header>
       {comp}
       <div className="content-wrap">
          <div className="container">
            {/* <Header></Header> */}
            {/* <Snackbar>
              
             </Snackbar> */}
            {/* {comp} */}
                <Row className="leaveReq"> 
                <h2 className="m-3 d-flex justify-content-center">
         Leave Request
        </h2>
                  <Col sm={5}>
        
                    <Form onSubmit={this.handleSubmit}>
                   
                    {/* <Form.Group style={{display:"none"}} as={Row} className="formGroup" controlId="EmpolyeeID">
                        <Form.Label column sm="4">Employee ID:</Form.Label>
                        <Col sm="8">
                        <Form.Control type="text" name="EmpolyeeID" onChange={this.handleChange}  className="formTextbox inlineFlex" required placeholder="Employee ID" 
                        ></Form.Control>
                        </Col>
                      </Form.Group> */}
                    <Form.Group as={Row} className="formGroup" controlId="LeaveType">
                    <Form.Label column sm="4">Leave Type:</Form.Label>
                    <Col sm="8">
                        <Form.Control  as="select" className="formTextbox inlineFlex">
                            <option id="1">Planned Leave</option>
                            <option id="2">Un-Planned Leave</option>
                        </Form.Control>  
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="formGroup" controlId="StartDate">
                        <Form.Label  column sm="4">Start Date:</Form.Label>
                        <Col sm="8">
                        <Form.Control type="date" name="StartDate"  onChange={this.handleChange}  className="formTextbox inlineFlex" required placeholder="Enter Email" 
                        ></Form.Control> 
                        </Col>                  
                      </Form.Group>
                      <Form.Group as={Row} className="formGroup" controlId="EndDate">
                        <Form.Label column sm="4">End Date:</Form.Label>
                        <Col sm="8">
                        <Form.Control type="date" name="EndDate" onChange={this.handleChange} className="formTextbox inlineFlex" required placeholder="Enter Password" 
                         ></Form.Control>
                         </Col>
                      </Form.Group>
                     
                      <Form.Group as={Row} className="formGroup" controlId="TLeaves">
                        <Form.Label  column sm="4">Leave Days:</Form.Label>
                        <Col sm="8">
                        <Form.Control type="text" name="TLeaves" onSelect={this.GetValue} className="formTextbox inlineFlex" required placeholder="Total Leave Count" 
                        ></Form.Control>             
                        </Col>        
                      </Form.Group>
                      <Form.Group className="formGroup">
                      {/* <Form.Label column sm="4">Upload File:</Form.Label> */}
            {/* <Form.File  required
              name="file"
              className="formTextbox btnform"
              id="validationFormik107"
              feedbackTooltip
            /> */}
              {/* <Col sm="6">
              <Form.File className="fontSizesm" type="file" /> 
               
             </Col>
             <Col sm="2">
             <Button> 
                    Upload! 
                  </Button> 

             </Col> */}
             <FileUpload></FileUpload>
          </Form.Group>
        
                      <Form.Group className="marginLeftForLeaveRequestButtons">
                        <Button variant="grey" type="submit" className="btnform GeryButtonCss">
                        Submit
                        </Button>
                        <Button variant="grey" onClick={this.handleHistory} className="m-2 btnform GeryButtonCss" style={{marginLeft: 30}}>View History</Button>
              
                      </Form.Group>
                    </Form>
                    
              
                     
            </Col>
          <Col>
          <Table className="tableCss tabledataAlignCenter" style={{display: this.state.isTable}} bordered striped  hover size="lg">
                        <thead>
                    <tr>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Leave Days</th>
                        <th>Leave Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.leaves.map(leave=>
                        <tr id={leave.leaveID} key={leave.leaveID}>
                        <td>{leave.leaveType}</td>
                        <td>{moment(leave.lStartDate).format('DD/MM/YYYY')}</td>
                        <td>{moment(leave.lEndDate).format('DD/MM/YYYY')}</td>
                        <td>{leave.leaveDays}</td>
                        <td>{leave.leaveStatus}</td>
                        </tr>
                        )}
                </tbody>
            </Table>
          </Col>
                       
              
                </Row>
               
               </div>
               </div>
                <Footer></Footer>
                
                
      </div>
   
         );
    }
}

 
export default LeaveRequest;