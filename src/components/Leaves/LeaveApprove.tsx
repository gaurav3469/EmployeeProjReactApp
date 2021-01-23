import React, { Component } from 'react';
import {Table, Button,ButtonToolbar, Row, Col, Form,Image} from 'react-bootstrap';
import FileUpload from './FileUpload';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navigation from '../Header/Navigation';
import moment from 'moment';
import ManagerNavigation from '../Header/ManagerNavgiation';
import configData from "../config.json";
interface userdata {
    emailID: string,
       employeeID: number,
      employeeName: string,
      profilePassword: string,
      userID: number,
      userRole: string
  }

 
class LeaveApprove  extends Component<userdata> {
    state={
      LeaveID:"",
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
            leaveStatus:"",
            employeeName:""
    
          }
        
        ]
      
      };
      constructor(props:any){
        super(props);
        this.updateLeaveStatus = this.updateLeaveStatus.bind(this);

    }
    
    componentDidMount(){
        let obj:userdata = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
      console.log("userInfo",obj.employeeID);
      this.state.EmployeeID=obj.employeeID;
      this.state.userRole = obj.userRole;
      console.log("Emp",this.state.userRole);
      this.refreshList();
  }

  refreshList(){
    //Consuming values from Api (GET method)
    fetch(configData.URL+'/LeaveDetails')
    .then(response=> response.json())
    .then(data=> {
        this.setState({
            leaves:data         
        });
        console.log(data);
    }  
    );

   
}
componentDidUpdate(){
  this.refreshList();
}
 updateLeaveStatus(leaveid:string,leavestatus:string){
    fetch(configData.URL+'/LeaveDetails/'+leaveid +'/'+leavestatus,{
            method:'PUT',
          })
          .then(res=> {
          if(res.status == 200)
          {
            this.refreshList();
            window.alert("Leave " + leavestatus +" Successfully");
           
            this.setState({snackbaropen:true,snackbarmsg:'Updated Successfully'});
          }
          else
          {
            this.setState({snackbaropen:true,snackbarmsg:'Update Failed'});
          }
          })
}

    render() { 
        let comp:any;
      if(this.state.userRole == 'Employee') {
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
            {/* <Header></Header>
            {comp} */}
            <Table striped bordered hover size="sm">
                        <thead>
                    <tr>
                      <th>Employee Name</th>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Leave Days</th>
                        <th>Leave Status</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.leaves.map(leave=>
                        <tr id={leave.leaveID} key={leave.leaveID}>
                        <td>{leave.employeeName}</td>
                        <td>{leave.leaveType}</td>
                        <td>{moment(leave.lStartDate).format('DD/MM/YYYY')}</td>
                        <td>{moment(leave.lEndDate).format('DD/MM/YYYY')}</td>
                        <td>{leave.leaveDays}</td>
                        <td>{leave.leaveStatus}</td>
                        <td>
                            <ButtonToolbar>
                                <Button className="m-2 GeryButtonCss" variant="grey" 
                                 onClick={()=> this.updateLeaveStatus(leave.leaveID,"Approved")}>
                                    Approve
                                    </Button>
                                    {/* <Button
                                    className="m-2"
                                    onClick={()=> this.deleteDep(dep.DepartmentID)} variant="danger"
                                    > Delete
                                    </Button>                                     */}
                                    <Button className="m-2 GeryButtonCss" variant="grey"
                                     onClick={()=> this.updateLeaveStatus(leave.leaveID,"Rejected")}>
                                    Reject
                                    </Button>
                            </ButtonToolbar>
                         
                        </td>
                        </tr>
                        )}
                </tbody>
            </Table>
            </div>
            </div>
            <Footer></Footer>
            </div>
         );
    }
}
 
export default LeaveApprove;