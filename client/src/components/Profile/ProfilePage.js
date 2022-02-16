import React, { useState } from 'react'
import ProfileInfo from './ProfileInfo'
import { Link } from 'react-router-dom';

import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPost, logoutpost } from '../../redux/actions/postActions';
import AddNewPost from './PostModal';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Redirect } from 'react-router';
import { logout } from '../../redux/actions/authAction';
import './profile.css'

const ProfilePage = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    
    const post = useSelector((state) => state.postReducer.post);
useEffect(() => {
  
  !post.length && dispatch(getPost())
}, [post])
const logoutf = () => {
    dispatch(logout());
    dispatch(logoutpost());
  };
  console.log(post);
  console.log(user);
if (!user){
  return <Redirect to ='/'/>
 }
 

    return (
        <div className="Page">
           <div className="Info-buttons">
            <div className="Info">
            <ProfileInfo user={user} post={post}/>
            </div>
            <div className="buttons">
            <div className="home">
            <Link exact to="/dashboard">
            <button className="Homebutton" data-title="Home" >
             <HomeIcon/>
            </button>
          </Link>
          
            </div>
            <div>
            <Link to="/" exact activeClassName="active-left-nav">
            <button className="logoutbutton" onClick={logoutf} data-title="Logout" >
             <LogoutIcon/>
            </button>
          </Link>

            </div>
            <div>
        <AddNewPost/>
            </div>
            </div>
            </div>
         {/* <Post item={post}/> */}

         <div className="gallery" style={{display:"flex", flexWrap:"wrap",justifyContent:"space-around"}}>
        {post.length && post.map((item)=>{
                       return(
                        
                          <div>
                      
                          <Post key={item._id} item={item}/>
                          </div>
                       )
                   })
               }
         </div>
       


</div>
    )
}

export default ProfilePage