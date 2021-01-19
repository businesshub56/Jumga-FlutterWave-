import axios from "axios";
import setAuthToken from "../utils/SetAuthToken";
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
import util from "../utils/util";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`${util}merchant/my-info`, config);
    dispatch({ type: USER_LOADED, payload: res.data });
    // console.log(res.data);
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
    // console.log({ type: AUTH_ERROR });
  }
};
//Register user

export const register = (formData) => async (dispatch) => {
  console.log("rerere");
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${util}register-merchant`, formData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    loadUser();
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data,
    });
    // console.log(err.response.data.msg);
  }
};

//Login User
export const login = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${util}login`, formData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    loadUser();
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.error_description,
    });
    // console.log(err.response.data.msg);
  }
};

//Logout user
export const logOut = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

//clear errors
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
