import {
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuPopover,
    MenuLink,
  } from "@reach/menu-button";
  import "@reach/menu-button/styles.css";
  import '../Aboutus.css';
  import SwitchPath from '../SwitchPath';
  import Signup from '../Login/Signup'

import Avatar from '@material-ui/core/Avatar';


function handleChange(){
  localStorage.clear();
};


 function Person() {

    return (
      <Menu>
      <MenuButton     className="button-primary"
  style={{ boxShadow: "2px 2px 2px hsla(0, 0%, 0%, 0.25)" }}
     ><Avatar style={{display:"inline-table"}} ></Avatar><span aria-hidden>▾</span>
     </MenuButton>
      <MenuList>
       
        
        <MenuLink href="/Myprofile"> 
         <img  style={{display:"inline-table"}}
          src="assets/me.jpg" 
          alt="About Me" /> About Me</MenuLink>
          <MenuLink href="/"> 
        <img  style={{display:"inline-table"}}
          src="assets/logout.png" 
          alt="Logout"
        /> Logout</MenuLink>
      </MenuList>
      
     
    </Menu>
    );
  }
  export default Person;  