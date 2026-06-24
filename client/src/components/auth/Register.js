// import React from 'react'

// const Register = () => {
//   return (
//     <div>
//       Register  
//     </div>
//   )
// }

// export default Register

// Hooks are new in React 16.8.  A Hook is a special type of function that allows us to hook into React features.
// useState is a Hook that allows us to add React state to function components. Prior to Hooks, if we were to write a function
// component and later had to add state to it, we had to convert it to a class, but now we can use a Hook inside the function component.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Register = () => {
  const [formData, updateFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpw: ''
  });

  const { name, email, password, confirmpw } = formData;
 
  // onChange handler configured to handle change for all fields
  const onChange = e => updateFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
 
  // onSubmit handler
  const onSubmit = e => {
    e.preventDefault();
    if (password !== confirmpw) {
      console.log('Passwords must match');
    } else {
      console.log(formData);
    }
  }

  return (
    <div>
      <h1 className="large text-primary">Register</h1>
      <p className="cta"><i className="fas fa-address-card"></i> Specify your account info</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} minLength="4" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Confirm Password" name="confirmpw" value={confirmpw} onChange={e => onChange(e)} minLength="4" />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="m">
        Already have an account? <Link to='/login'>Log In</Link>
      </p>
    </div>
  )
};

export default Register;