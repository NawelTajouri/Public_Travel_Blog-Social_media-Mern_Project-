import {CREATE_POST_SUCCESS, DeletePostsLogout, DELETE_POST, GET_POST_SUCCESS, LIKE_POST} from '../const/index'
import { GET_ALL_POSTS_SUCCESS, UNLIKE_POST, MAKE_COMMENT } from './../const/index';

const initialState = {
    post:[],
    allposts:[],

}
export default (state = initialState, { type, payload }) => {
    switch (type) {

        case CREATE_POST_SUCCESS:
            return {
                ...state,
                post: payload.result
              };
              case GET_POST_SUCCESS:
            return {
                ...state,
                post: payload.mypost,
               
              };
              case GET_ALL_POSTS_SUCCESS:
                return {
                    ...state,
                    allposts: payload.posts,
                   
                  };
 case DeletePostsLogout:
   return {
    
      ...state,
      post: null,
     

   }
                  case LIKE_POST:
                        return {
                          ...state, 
                          post:state.post.map(item=>{
                            if(item._id === payload._id) {
                              return payload
                              
                            }else{ return item}
                        })}
                  case UNLIKE_POST:
                    return {
                      ...state, 
                      post:state.post.map(item=>{
                        if(item._id === payload._id) {
                          return payload
                          
                        }else{ return item}
                    })}

                    case MAKE_COMMENT:
                      return {
                        ...state, 
                        post:state.post.map(item=>{
                          if(item._id === payload._id) {
                            return payload
                            
                          }else{ return item} 
                      })}

                      case DELETE_POST:
                      return {
                        ...state, 
                        post:state.post.filter(item=>{
                          if(item._id !== payload._id) {
                            return payload
                            
                          }else{ return item} 
                      })}
                      
     
    default:
        return state
        
    }
}