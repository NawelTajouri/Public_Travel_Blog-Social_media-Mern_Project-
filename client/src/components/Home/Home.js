import React from "react";
// import Jumbotron  from 'react-bootstrap/lib/Jumbotron';
import Navbar from "../Navbar/Navbar"
import 'bootstrap/dist/css/bootstrap.css';
import './home.css';
import RegisterImage from '../../images/register.jpg';
import LoginImage from '../../images/Login.jpg';
import ProfileImage from '../../images/profile.jpg';
import AddPostImage from '../../images/addPost.jpg';

export default () => {
  return (
   <div className="homePage">

     <Navbar />
     
      <h1>Welcome</h1>
      <p>
        Here You can share with all the world your travel experience </p> 
        <p>Discover the world through videos and posts 
      </p>
      <div className="RegisterImage">
        <p>Register to Our Blog <br/> And Share Your Travel Experience</p>
        <img src={RegisterImage} alt="signup"/>

      </div>
      <div className="LoginImage">
        <p>Login And Enjoy Our Travel Blog</p>
        <img src={LoginImage} alt="signup"/>
        
      </div>
      <div className="AddPostImage">
        <p>Add a Post</p>
        <img src={AddPostImage} alt="signup"/>
        
      </div>
      <div className="ProfileImage">
        <p>You Have Your Profile <br/> Where you can store Your pictures and experiences</p>
        <img src={ProfileImage} alt="signup"/>
        
      </div>
      
    </div>
    
  );
}