import './App.css';
import Button from 'react-bootstrap/Button';
import SwitchPath from './components/SwitchPath';
import Header from './components/Header/Header';
//Implementing Component Routing in React
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import Navigation from './components/Header/Navigation';
import Signup from './components/Login/Signup';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';

function App() {
  return (

   
    <div>
     

        {/* <h3 className="m-3 d-flex justify-content-center">
        Employee Management Portal
        </h3> */}
        {/* <Navigation></Navigation> */}
     
       <SwitchPath></SwitchPath>
    </div>

    // <Signup></Signup>


  
  );
}

export default App;
