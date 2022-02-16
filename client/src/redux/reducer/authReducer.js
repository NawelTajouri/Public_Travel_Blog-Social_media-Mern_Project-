import {

  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  AUTH_FAIL,
  SETLOADING,
  GET_AUTH_USER,
  LOGOUT,
  FOLLOW_UNFOLLOW_USER,
  UNFOLLOW_USER,
} from "../const/index";

const initialState = {
  user: {},
  // token: null,
  isLoading: false,
  isAuth: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // case SETLOADING:
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };

    case LOGIN_USER_SUCCESS:
      case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        // token: payload.token,
        isLoading: false,
        isAuth: true,
      };
    case GET_AUTH_USER:
      return {
        ...state,
        user: payload.user,
       
        isLoading: false,
        isAuth: true,
      };
    case AUTH_FAIL:
    case LOGOUT:
        localStorage.removeItem('token')
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        user: null,
        // token: null,
      };
      case FOLLOW_UNFOLLOW_USER:
        // localStorage.setItem("user",JSON.stringify(payload))
        return {
          ...state,
          user:{...state.user, followers:payload.followers},
          user:{...state.user, following:[...state.user.following,payload.userid]},
        };
        case UNFOLLOW_USER:
        // localStorage.setItem("user",JSON.stringify(payload))
        return {
          ...state,
          user:{...state.user, followers:payload.followers},
          user:{...state.user, following:[...state.user.following.filter(item=>item != payload.userid )]}
        };
    default:
      return state;
  }
};
