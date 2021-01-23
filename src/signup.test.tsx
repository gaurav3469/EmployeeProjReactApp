import React from 'react';
import { shallow } from 'enzyme';
import Signup from './components/Login/Signup';

describe('Test case for testing Signup', () => {
   
const     wrapper = shallow(<Signup />)  
    
    // it('EmailID check',()=>
    // {
    //    // wrapper = shallow(<Signup>);
    // wrapper.find('input#emailAddress').simulate('change',{target: {name: 'emailAddress', value: 'amit@gmail.com'}});
    // expect(wrapper.state('emailAddress')).toEqual('amit@gmail.com');
    // });
    
    // it('password check',()=>{
    //   wrapper.find('input#password').simulate('change', {target: {name: 'password', value: 'amit'}});
    //   expect(wrapper.state('password')).toEqual('amit');
    //   })
  
  it('should have a signup btn component', ()=> {
      //There should be only one button
      expect(wrapper.find('Button#signupButton')).toHaveLength(1);
      //Button should be of type button
      expect(wrapper.find('Button#signupButton'))
      //.type().defaultProps.type)
      //Button should have matching text
      expect(wrapper.find('Button#signupButton').text()).toEqual('Sign Up');
  });
  it('should have a Close btn component', ()=> {
      //There should be only one button
      expect(wrapper.find('Button#closeButton')).toHaveLength(1);
      //Button should be of type button
      expect(wrapper.find('Button#closeButton'))
      //.type().defaultProps.type)
      //Button should have matching text
      expect(wrapper.find('Button#closeButton').text()).toEqual('Close');
  });
  it('should have input for email and password', ()=> {
      //Email and password input field should be present
      expect(wrapper.find('input#emailAddress')).toHaveLength(1);
      expect(wrapper.find('input#password')).toHaveLength(1);
  });

    
    })
    