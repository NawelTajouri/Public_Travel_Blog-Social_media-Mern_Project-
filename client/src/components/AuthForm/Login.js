import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux/actions/authAction";

import { Link, Redirect } from 'react-router-dom';
import './Login.css'
const Login = ({ history }) => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //login

    dispatch(signin(formData));
  
    history.push("/profile");
  };
  // const isAuth = useSelector((state) => state.authReducer.isAuth);
  // if (isAuth) {
  //   <Redirect to = "/dashboard"/>
  // }

  return (
    <div  className='form-signin' >
  <div className="form" style={{'paddingTop':'100px','paddingLeft':'300px'}}>
  <div className='infos' >
    <div >
    <h4>Sign In here</h4>
    <p>Please Enter your Details to Login And Share with the World Your Experience</p>
    <h5>Do not have an Account?</h5>
    <div className="signup-button">
     <Link to='/SignUp'>
     <div class="butonSignIn">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  Sign up
</div>
   
    </Link>
    </div> 
   
    </div>
   
    <div>
    <form onSubmit={handleSubmit} className="SignIn">

      {/* <label>Email address</label> */}
      <input
        onChange={handleChange}
        
        value={formData.email}
        name="email"
        type="email"
        placeholder="Enter email"
      />
      <br />

      {/* <label>Password</label> */}
      <br />
      <input
        onChange={handleChange}
        value={formData.password}
        name="password"
        type="password"
        placeholder="Password"
      />
      <br />
      <span></span>
      <br/>
      <button type="submit" class="butonSignIn">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  Login
</button>
    
      {/* <Button variant="primary" type="submit">
        Submit
      </Button> */}
    </form>
    </div>
  </div>
  

</div>
</div>
  );
};

export default Login;
