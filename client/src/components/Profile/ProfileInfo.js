import React from 'react'
import { useSelector } from 'react-redux';
import { Avatar } from "@material-ui/core";
import { getallposts } from './../../redux/actions/postActions';
import './profile.css'

const ProfileInfo = ({user,post}) => {
console.log(user);
    return (

        <div >
            
        <div className="infos">
             <div className="icons-bis">
            <Avatar  alt="Remy Sharp" src={`/${user.picture}`} />
          </div>
          <div name>
          <h6>{user.name +' '+ user.lastName}</h6>
          </div>
            
            {/* <div style={{display:"flex", justifyContent:"space-between", width:"50%"}}> */}
                {/* <h6>{post.length} posts</h6> */}
                {/* <h6>{user.followers.length} followers</h6>
                <h6>{user.following.length} following</h6> */}

                
            {/* </div> */}
        </div>

        </div> 

    )

   
}

export default ProfileInfo
