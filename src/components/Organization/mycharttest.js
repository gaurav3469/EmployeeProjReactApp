import React, { Component } from 'react';
import OrgChart from './mychart';
import Navigation from '../Header/Navigation';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ManagerNavigation from '../Header/ManagerNavgiation';

            class mycharttest extends Component {
              constructor(props) {
                super(props);
                this.state = {isLoading:true,userdata:[]};
              }

              componentWillMount(){
                localStorage.getItem('currentUser') && this.setState({
                    userdata:JSON.parse(localStorage.getItem('currentUser')),
                    isLoading:false
                })
            }

              render() {
                let comp = "";
                if (this.state.userdata.userRole == 'Employee') {
                    comp = <Navigation></Navigation>
                  } else {
                    comp = <ManagerNavigation></ManagerNavigation>
                  }
                return (
                  <div className="page-container">
                  <div className="content-wrap">
                           <div style={{height: '100%'}}>
                           <Header></Header>
                         {comp}
                          <h2 className="m-3 d-flex justify-content-center">
        Organization Structure
        </h2>
    

     <div className="OrgChange">


                           <OrgChart nodes={
                                     [{id: 1, name: "Arjun Reddy" , title: "Director","Department": "HR" },
                                     {id: 2, pid: 1, name: "Bhuvan Kumar" , title: "Senior Manager","Department": "IT" },
                                     {id: 3, pid: 1, name: "Amit Gupta" , title: "Senior Specialist" ,"Department": "IT"},
                                     {id: 4, pid: 2, name: "Rohit Jais" , title: "Programmer" ,"Department": "IT"},
                                     {id: 5, pid: 2, name: "Mohit shaikh" , title: "Specialist","Department": "Marketing" },
                                     {id: 6, pid: 5, name: "Arun Kamble" , title: "Developer","Department": "IT" },
                                     {id: 7, pid: 5, name: "Jyoti Pathare" , title: "Developer","Department": "IT" }]} />
                  </div>
                  </div>
                  </div>
                  <Footer></Footer>
                  </div>
                );
              }
            }
            export default mycharttest;
        