import {
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  USER_LOADED,
} from "../actions/Types";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  error: null,
  user: null,
  merchantUser: null,
  merchantShops: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        merchantUser: action.payload.user,
        merchantShops: action.payload.shops,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userType", action.payload.userType);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
