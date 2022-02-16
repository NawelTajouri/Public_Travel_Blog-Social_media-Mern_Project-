import {React, useEffect,createContext,useReducer} from 'react'
import './App.css';
import { BrowserRouter,Switch,useHistory } from "react-router-dom";
import { Route } from "react-router"
import axios from "axios";
import Home from "./components/Home/Home";
// import Navbar from "./components/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.css';

import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/AuthForm/Login';
import PrivateRoute from './components/PrivateRoute/index';
import SignUp from './components/AuthForm/SignUp';
import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState, createContext } from 'react';
import { getAuthUser } from './redux/actions/authAction';
import ProfilePage from './components/Profile/ProfilePage';
import UserProfile from './components/Profile/UserProfile';
import AddNewPost from './components/Profile/PostModal';
import { useState } from 'react';

const Routing =() => {
 const dispatch = useDispatch()
   const isLoading = useSelector((state) => state.authReducer.isLoading);
 

  useEffect(() => {
dispatch(getAuthUser())
  }, [])
  
  return(
    <Switch>
    
    <Route exact path="/"  component={ Home} />
    <Route  path="/login" component={Login} />
    
     <Route path="/SignUp" component={SignUp} /> 
     
     <PrivateRoute exact path="/dashboard" component={Dashboard} /> 
     <PrivateRoute exact path="/profile" component={ProfilePage} /> 
     <PrivateRoute  path="/profile/:userid" component={UserProfile} />
    
     <PrivateRoute path="/addpost" component={AddNewPost} /> 
     
    
  </Switch>
  )
}
function App() {
  const token =localStorage.getItem('token')
 
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  // const user = useSelector((state) => state.authReducer.user); 



  //Load the app the first time waiting for the getAuthUser response
  if (isLoading) {
    return <h1> Loading ......</h1>;
  }


  return (
   
    <>

     
    <BrowserRouter>
      {/* <Navbar /> */}
     
      <Routing/>
      
    </BrowserRouter>
   
  
   </>
  );
}

export default App;
