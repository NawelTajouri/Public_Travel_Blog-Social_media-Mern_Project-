import React, { useState } from "react";
import { useDispatch} from 'react-redux';
import { Link,Redirect } from "react-router-dom";
import { signup } from '../../redux/actions/authAction';

import './SignUp.css'
import { useSelector } from 'react-redux';

const SignUp = ({history}) => {
const isAuth=useSelector((state) => state.authReducer.isAuth)

  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    username:"",
    picture:"",
    email: "",
    password: "",
    confirmPassword:""
  });
const dispatch = useDispatch()
  const handleChange = (e) =>
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newUser.name);
    formData.append('lastName', newUser.lastName);
    formData.append('username', newUser.username);
    formData.append('picture',newUser.picture);
    formData.append('email', newUser.email);
    formData.append('password', newUser.password);
    formData.append('confirmPassword', newUser.confirmPassword);
    dispatch(signup(formData))
    // history.push("/dashboard");
}
const handlePhoto = (e) => {
  setNewUser({...newUser, picture: e.target.files[0]});
}
const token=localStorage.getItem("token")
if (token) {
  return <Redirect to='/dashboard'/>
}
// style={{'backgroundImage':'url(https://media.istockphoto.com/photos/travel-during-the-covid19-pandemic-airplane-model-with-face-mask-and-picture-id1268257924?b=1&k=20&m=1268257924&s=170667a&w=0&h=kviE-Bd4sAaGuHXJqdzxk__-URPKAZV6Zj7VpnuXges=)','backgroundSize':'cover','backgroundRepeat':'no-repeat','opacity': '.8'}}
  return (
    
<div  className='form-signup' >
  <div className="form" style={{'paddingTop':'100px','paddingLeft':'300px'}}>
  <div className='infos' >
    <div >
    <h4>Sign Up here</h4>
    <p>Please Enter your Details to sign up <br/> And be part of our great Blog</p>
    <h5>Already have an Account?</h5>
    <div className="login-button">
     <Link to='/login'>
     <div class="button2">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  Sign in
</div>
   
    </Link>
    </div> 
   
    </div>
   
    <div>
<form onSubmit={handleSubmit} encType='multipart/form-data' className="SignUp">
{/* <label for="name">First name:</label><br/> */}
<input 
    type="text"
    placeholder="Name"
    name='name'
    value={newUser.name}
    onChange={handleChange}
/><br/>
<span></span>
<br/>
{/* <label for="lastName">Last name:</label><br/> */}
<input 
    type="text"
    placeholder="Last Name"
    name='lastName'
    value={newUser.lastName}
    onChange={handleChange}
/><br/>
{/* <label for="UserName">User name:</label><br/> */}
<span></span>
<br/>
<input 
    type="text"
    placeholder="Username"
    name='username'
    value={newUser.username}
    onChange={handleChange}
/><br/>
{/* <label for="email">Email:</label><br/> */}
<span></span>
<br/>
<input 
    type="text"
    placeholder="Email"
    name='email'
    value={newUser.email}
    onChange={handleChange}
/><br/>
{/* <label for="password">LPassword</label><br/> */}
<span></span>
<br/>
<input 
    type="password"
    placeholder="Password"
    name='password'
    value={newUser.password}
    onChange={handleChange}
/>
<br/>
{/* <label for="confirmPassword">Confirm Password</label><br/> */}
<span></span>
<br/>
<input 
    type="password"
    placeholder="Confirm password"
    name='confirmPassword'
    value={newUser.confirmPassword}
    onChange={handleChange}
/>
<br/>
<span></span>
<br/>

<input 
    type="file" 
    placeholder="Profile picture"
    accept=".png, .jpg, .jpeg"
    name='picture'
    onChange={handlePhoto}
/>
<br/>
<span></span>
<br/>
<button type="submit" class="button2">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  Sign Up
  
</button>
    

</form>

</div>
  </div>
  

</div>
</div>

  );

};

export default SignUp;