import React,{Component} from 'react'; 
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import configData from "../config.json";
class FileUpload extends Component {
    state = { 
  
        // Initially, no file is selected 
        selectedFile: null,
        selectedFileName: null,
        isButton:"none"
      }; 
       
      // On file select (from the pop up) 
      onFileChange = event => { 
        // Update the state 
        this.setState({ selectedFile: event.target.files[0],selectedFileName:event.target.files[0].name,isButton:"block" }); 
       
      }; 
       
      // On file upload (click the upload button) 
      onFileUpload = () => { 
       
        // Create an object of formData 
        const formData = new FormData(); 
        // formData.append(
        //     this.state.selectedFile, 
        //     this.state.selectedFile.name 
        //   ); 
        // Update the formData object 
        formData.append("formFile",this.state.selectedFile);
         formData.append("fileName",this.state.selectedFileName); 
     
        // Details of the uploaded file 
        // console.log(File);
        console.log(formData);
        console.log(this.state.selectedFileName);
        console.log(this.state.selectedFile); 
       
        // Request made to the backend api 
        // Send formData object 
        // fetch.post("https://localhost:44366/api/file", formData); 

        fetch(configData.URL+'/file', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          console.log("Response",response);
          if(response.status==201)
          {
            window.alert("File Uploaded Successfully");
            this.setState({isButton:"none"});
          }
          else{
            window.alert("File Uploaded Failed");
          }
        })
        // .then(data => {
        //   console.log("Response",data);
         
        // })
        // .catch(error => {
        //   console.error(error)
        // })
      
      
      }; 
       
      // File content to be displayed after 
      // file upload is complete 
      // fileData = () => { 
       
      //   if (this.state.selectedFile) { 
            
      //     return ( 
      //       <div> 
      //         <h2>File Details:</h2> 
      //         <p>File Name: {this.state.selectedFile.name}</p> 
      //         <p>File Type: {this.state.selectedFile.type}</p> 
      //         <p> 
      //           Last Modified:{" "} 
      //           {this.state.selectedFile.lastModifiedDate.toDateString()} 
      //         </p> 
      //       </div> 
      //     ); 
      //   } else { 
      //     return ( 
      //       <div> 
      //         <br /> 
      //         <h4>Choose before Pressing the Upload button</h4> 
      //       </div> 
      //     ); 
      //   } 
      // }; 
       
      render() { 
       
        return ( 
          <div> 
              {/* <h1> 
                GeeksforGeeks 
              </h1> 
              <h3> 
                File Upload using React! 
              </h3>  */}
              <div> 
              <Form>
              <Form.Group  as={Row} className="formGroup">
              <Form.Label column sm="4">Upload File:</Form.Label>
              <Col sm="6">
                  <Form.File className="fontSizesm" type="file" onChange={this.onFileChange} /> 
                  </Col>
                  <Col sm="2">
                  <Button style={{display: this.state.isButton}}  className="GeryButtonCss" variant="grey" onClick={this.onFileUpload}> 
                    Upload! 
                  </Button> 
                  </Col>
                  </Form.Group>
                  </Form>
              </div> 
            {/* {this.fileData()}  */}
          </div> 
        ); 
      } 
}
 
export default FileUpload;