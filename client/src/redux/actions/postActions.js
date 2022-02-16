import axios from "axios";
import { CREATE_POST_SUCCESS, DeletePostsLogout, DELETE_POST, GET_POST_SUCCESS, LIKE_POST } from '../const/index';
import { GET_ALL_POSTS_SUCCESS, UNLIKE_POST, MAKE_COMMENT } from './../const/index';
import { getAuthUser } from "./authAction";
// Create a post
export const createPost = (formData) => async (dispatch) => {
    const config = {
        headers: {
           Authorization: localStorage.getItem("token")
        },
    }
        try {
        
        let { data } = await axios.post("/post/newpost", formData,config)
        
console.log(data)

        dispatch(
            {
                type: CREATE_POST_SUCCESS,
                payload: data //post entries
            }
        )

    } catch (error) {
        console.dir(error)

    
    }
    }
// Get posts of the user
export const getPost = () => async(dispatch) =>{
        const config = {
            headers: {
                Authorization:localStorage.getItem("token")
            },
        }
        try {
            const {data} = await axios.get("/post/mypost", config)
         console.log(data)
           
       dispatch({
           type: GET_POST_SUCCESS,
           payload: data
       })
       
        } catch (error) {
            console.log(error)
        }
    }
// Get all posts of all users
    export const getallposts = () => async(dispatch) =>{
        const config = {
            headers: {
                Authorization: localStorage.getItem("token")
            },
        }
        try {
            const {data} = await axios.get("/post/allpost", config)
         console.log(data)
           
       dispatch({
           type: GET_ALL_POSTS_SUCCESS,
           payload: data
       })
       
        } catch (error) {
            console.log(error)
        }
    }
// Like a post
    export const likePost = (id)=> async dispatch =>{
        const config = {
            headers: {
                Authorization:localStorage.getItem("token")
            },
            
        }
        
        try {
          const res=  await axios.put("/post/like",{
            postId: id
        },config)
            dispatch({ type: LIKE_POST, payload:res.data })
            console.log(res)
        } catch (error) {
            console.dir(error)
            
        }
      }
// unlike a post
      export const unlikePost = (id)=> async dispatch =>{
        const config = {
            headers: {
                Authorization:localStorage.getItem("token")
            },     
        }
        try {
            const res=await axios.put("post/unlike",{
                postId: id
            },config)
            dispatch({ type: UNLIKE_POST, payload:res.data })
        } catch (error) {
            console.log(error)
        }
      }
// Comment a post
      export const makeComment =(newtext,id) => async (dispatch) => {
        const config = {
            headers: {
                Authorization:localStorage.getItem("token")
            },     
        }
        try {
            const res=await axios.put("post/comment",{
                postId: id, text:newtext
            },config)
            console.log(res.data)
            dispatch({ type: MAKE_COMMENT, payload:res.data })
        } catch (error) {
            console.log(error)
        }
      }
// Delete a post
      export const deletepost = (postId)=> async(dispatch)=>{
        const config = {
            headers: {
                Authorization:localStorage.getItem("token")
            },     
        }
        try {
            const res=await axios.delete("/post/deletepost/"+ postId,config)
            console.log(res.data)
            dispatch({ type: DELETE_POST, payload:res.data })
        } catch (error) {
            console.log(error)
        }
      }
//Logout from a post
 export const logoutpost = () => async(dispatch) =>{
   
  
   dispatch({
       type: DeletePostsLogout,
    
   })
   
}