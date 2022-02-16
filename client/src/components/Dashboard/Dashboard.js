import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAuthUser} from '../../redux/actions/authAction';
import SideBar from "../AuthForm/SideBar";
import axios from "axios";
import NavDash from './../AuthForm/NavDash';
import { getallposts } from './../../redux/actions/postActions';
import AllPosts from "../Home/AllPosts";
import './Dashboard.css'
import { Container } from 'react-bootstrap';

const Dashboard = () => {
  const dispatch = useDispatch();
 
   const allposts = useSelector((state) => state.postReducer.allposts);
    useEffect(() => {
      dispatch(getallposts());
      
    },[dispatch]);
    console.log(allposts)


  return (
    <div className="Accueil">
      <Container>
      <div className="Nav">
        
      <div className="side-bar">
      <SideBar/>
      </div>
      <div className="dash-bar">
      <NavDash/>
      </div>
      
      </div>
      </Container>
    <div>
    
      
    
    {allposts ?  <div className="gallery">
               {
                   allposts.map((post1, i)=>{
                       return(
                          <div className="post-card"> 
                        <AllPosts key={i} item={post1}/>
                         
                          </div>
                       )
                   })
               }</div>
               :<h1>Dashboard</h1>           
            

           
           }
    </div>
    </div>
  );
};

export default Dashboard;