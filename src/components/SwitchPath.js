import React, { Component } from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import Home from './Home/Home';
import Department from './Department/Department';
import Employee from './Employee/Employee';
import Signup from './Login/Signup';
import Aboutus from './Aboutus';
import Login from './Login/Login'
import  Fileupload  from './Leaves/FileUpload';
import LeaveRequest from "./Leaves/LeaveRequest";
import OrgChart from "./Organization/mycharttest"; 
import LeaveDetails from './Leaves/LeaveApprove'
import MyProfile from './Home/Myprofile';


class SwitchPath extends Component {
    state = {  }
    render() { 
        return (
            <BrowserRouter>
            <Switch>
            <Route path='/' component={Login} exact></Route>
            <Route path='/Aboutus' component={Aboutus} exact></Route>
            <Route path='/Home' component={Home} exact></Route>
            <Route path='/Department' component={Department}></Route>
            <Route path='/Employee' component={Employee}></Route>
            <Route path='/Signup' component={Signup}></Route>
            <Route path='/Fileupload' component={Fileupload}></Route>
            <Route path="/Leaverequest" component={LeaveRequest}></Route>
            <Route path="/OrgChart" component={OrgChart}></Route>
            <Route path="/LeaveDetails" component={LeaveDetails}></Route>
            <Route path="/MyProfile" component={MyProfile}></Route>
          </Switch>
          </BrowserRouter>
          );
    }
}
 
export default SwitchPath;