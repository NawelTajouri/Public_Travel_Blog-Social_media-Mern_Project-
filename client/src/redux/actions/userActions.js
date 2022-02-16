import axios from "axios";
import { FOLLOW_UNFOLLOW_USER,  GET_USER_PROFILE, UNFOLLOW_USER, UNUPDATE, UPDATE } from './../const/index';
export const getuserprofile = (userid) => async(dispatch) =>{

    const config = {
        headers: {
            Authorization:localStorage.getItem("token")
        },
    }
    try {
        const {data} = await axios.get("/user/profileuser/"+ userid, config)
   dispatch({
       type: GET_USER_PROFILE,
       payload: data
   })
   console.log(data)
   
    } catch (error) {
        console.log(error)
        
    }
}

//Follow a user
export const followUser =(userid) => async(dispatch)=>{
    
    const config = {
        headers: {
            Authorization:localStorage.getItem("token")
        },
    }
    
    try {
        const {data} = await axios.put("/user/follow",{
            followId:userid
        } , config)
        console.log(data);
        
   dispatch({
       type: UPDATE,
       payload:data
   })
//    localStorage.setItem("user",JSON.stringify(data))

dispatch({
       type: FOLLOW_UNFOLLOW_USER,
       payload:{userid,data}
   })
   console.log(data)
   
    } catch (error) {
        console.log(error)
        
    }
}

export const unfollowUser =(userid) => async(dispatch)=>{
    
    const config = {
        headers: {
            Authorization:localStorage.getItem("token")
        },
    }
    
    try {
        const {data} = await axios.put("/user/unfollow",{
            unfollowId:userid
        } , config)
        console.log(data);
        
   dispatch({
       type: UNUPDATE,
       payload:data
   })
//    localStorage.setItem("user",JSON.stringify(data))

dispatch({
       type: UNFOLLOW_USER,
       payload:{userid,followers:data.followers}
   })
   console.log(data)
   
    } catch (error) {
        console.log(error)
        
    }
}