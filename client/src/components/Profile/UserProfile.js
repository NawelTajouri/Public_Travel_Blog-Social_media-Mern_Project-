import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import Post from './Post';
import UserPosts from './UserPosts'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {useParams} from 'react-router-dom'

import { Redirect } from 'react-router';
import ProfileInfo from './ProfileInfo';

import {  followUser, getuserprofile, unfollowUser } from './../../redux/actions/userActions';
import { followorunfollowuser, getAuthUser } from './../../redux/actions/authAction';
import { getPost } from '../../redux/actions/postActions';
import UserPost from './UserPosts';
const UserProfile = () => {
  const user = useSelector((state) => state.authReducer.user);
  const isAuth = useSelector((state) => state.authReducer.isAuth);

  const userprofile = useSelector((state) => state.userReducer.userprofile);   
  const postprofile = useSelector((state) => state.userReducer.postprofile);
  const {userid}=useParams();
  console.log(userid)
  // console.log(user.following.includes(userid));
  console.log(user.following);
  const [showfollow,setShowFollow] = useState(isAuth? !user.following.includes(userid):true)

    const dispatch = useDispatch();
  
    

    if (isAuth){
      console.log(userprofile);
  }
useEffect(() => {
   dispatch(getuserprofile(userid))
    }
, [])

console.log(postprofile);
const follow = () => {

  dispatch(followUser(userid))
  setShowFollow(false)
 
};
const unfollow =()=>{
  dispatch(unfollowUser(userid))
  setShowFollow(true)
}
console.log(userprofile.followers);
console.log(user._id);
console.log(showfollow);
if (!userprofile){
    return <Redirect to ='/dashboard'/>
   }
    return (

        <div>
          {isAuth?
          <div>
<div className="Info">
<ProfileInfo user={userprofile} post={postprofile}/>
            </div>
        <Link to="/profile">
           <button>MyProfile</button>
           </Link>
        {user.following.includes(userid)?
        
           <button onClick={()=>unfollow()}>UnFollow</button>
       
          : <button onClick={()=>follow()}>Follow</button>}
        <div className="gallery" style={{display:"flex", flexWrap:"wrap",justifyContent:"space-around"}}>
        {postprofile.map((item,i)=>{
                       return(
                       
                          <div>
                       
                          <UserPost key={i} item={item}/>
                          </div>
                       )
                   })
               }
         </div>
         </div>

: ''}
</div> 

    )
}

export default UserProfile 
