
import {  GET_USER_PROFILE, UNUPDATE, UPDATE } from './../const/index';
  
  
  const initialState = {
    userprofile: {},
    postprofile:[]
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_USER_PROFILE:
        return {
          ...state,
          userprofile:payload.user,
          postprofile:payload.posts
        };
        case UPDATE:
          return  {
            ...state,
            userprofile:{...state.userprofile, followers:[...state.userprofile.followers,payload._id]},
        }
        case UNUPDATE:
          return  {
            ...state,
            userprofile:{...state.userprofile, followers:[...state.userprofile.followers.filter(item=>item != payload._id )]},
        }

        default:
          return state;
    }}