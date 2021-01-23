import React,  { Component} from 'react';

//Creating bootstrap Grid
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';

import EditDepModal from './EditDepModal';
import DeleteDepModal from './DeleteDepModal';
import Navigation from '../Header/Navigation';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ManagerNavigation from '../Header/ManagerNavgiation';
import configData from "../config.json";
class Department extends Component {
    constructor(props){
        super(props);
        this.state={deps:[],addModalShow:false,deleteModalShow:false,messageBoxOpen:false,isLoading:true,userdata:[]}
    }

    componentDidMount(){
        this.refreshList();
    }
    componentWillMount(){
        localStorage.getItem('currentUser') && this.setState({
            userdata:JSON.parse(localStorage.getItem('currentUser')),
            isLoading:false
        })
    }

    refreshList(){
        //Hardcoded values
        // this.setState({
        //     deps:[{"DepartmentID":1,"DepartmentName":"IT"},
        //     {"DepartmentID":2,"DepartmentName":"Support"}]
        // })
        
        //Consuming values from Api (GET method)
        fetch(configData.URL+'/departments')
        .then(response=> response.json())
        .then(data=> {
            this.setState({
                deps:data          
            });
            console.log(data);
        }  
        );
        // const url = "https://localhost:44366/api/departments";
        // const response = await fetch(url);
        // const data = await response.json();
        // console.log(data);
   
       
    }
    
    //To refresh the grid after adding in page
    componentDidUpdate(){
        this.refreshList();
    }

     //Deleting values from Api
    // deleteDep(depid){ 
    //     console.log(depid);
    //     if(window.confirm('Are you sure?'))
    //     {
    //         fetch('http://localhost:63308/api/department/'+depid,
    //         {
    //             method:'DELETE',
    //             header:{'Accept':'application/json',
    //             'Content-Type':'application/json'}
    //         });
    //     }
    // }

    render() { 
        const{deps,depid,depname,deptLocation}=this.state;
        let addModalClose =() => this.setState({addModalShow:false});
        let editModalClose =() => this.setState({editModalShow:false});
        let deleteModalClose =() => this.setState({deleteModalShow:false});
        let comp = "";
        if (this.state.userdata.userRole == 'Employee') {
            comp = <Navigation></Navigation>
          } else {
            comp = <ManagerNavigation></ManagerNavigation>
          }
        return ( 
            // <div className="mt-5 d-flex justify-content-left">
            //     <h3>This is Department page.</h3>
            // </div>
            <div className="page-container">
                <Header></Header>
                {comp}
            <div className="content-wrap">
            <div className="container">
            {/* <Header></Header>
            {comp} */}
            <div>
            {/* <Table className="mt-4" striped bordered hover size="sm"> */}
            <Table className="tabledataAlignCenter" striped bordered hover size="sm">
                <thead>
                    <tr>
                        {/* <th>DepartmentID</th> */}
                        <th>Department Name</th>
                        <th>No. Of Employees</th>
                        <th>Department Location</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep=>
                        <tr id={dep.departmentID} key={dep.departmentID}>
                        {/* <td>{dep.departmentID}</td> */}
                        <td style={{paddingTop:"21px"}}>{dep.departmentName}</td>
                        <td style={{paddingTop:"21px"}}>{dep.totalEmployees}</td>
                        <td style={{paddingTop:"21px"}}>{dep.deptLocation}</td>
                        <td>
                            <ButtonToolbar className="tableDataButtonPadding">
                                <Button className="m-2 GeryButtonCss" variant="grey" 
                                onClick={()=> this.setState({editModalShow:true,depid:dep.departmentID,depname:dep.departmentName,deptLocation:dep.deptLocation})}>
                                    Edit
                                    </Button>
                                    {/* <Button
                                    className="m-2"
                                    onClick={()=> this.deleteDep(dep.DepartmentID)} variant="danger"
                                    > Delete
                                    </Button>                                     */}
                                    <Button
                                    className="m-2"
                                    onClick={()=> this.setState({deleteModalShow:true,depid:dep.departmentID})} variant="danger"
                                    >
                                    Delete
                                    </Button>
                                    <EditDepModal
                                     show = {this.state.editModalShow}
                                     onHide = {editModalClose}
                                     depid= {depid}
                                     depname = {depname}
                                     deptLocation = {deptLocation}
                                    ></EditDepModal>
                                    
                                    <DeleteDepModal 
                                    show = {this.state.deleteModalShow}
                                    onHide = {deleteModalClose}
                                    depid = {depid}>

                                    </DeleteDepModal>
                            </ButtonToolbar>
                         
                        </td>
                        </tr>
                        )}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button className="GeryButtonCss" variant="grey" onClick={()=> this.setState({addModalShow:true})}>
                 Add Department
                </Button>
                <AddDepModal show={this.state.addModalShow} onHide={addModalClose}>
                </AddDepModal>
            </ButtonToolbar>
                  
          </div>
          </div>
        </div>
        <Footer></Footer>
            </div>
         );
    }
}
 
export default Department;