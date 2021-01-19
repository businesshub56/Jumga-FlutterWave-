import axios from "axios";
import setAuthToken from "../utils/SetAuthToken";

import {
  GET_ITEMS,
  GET_All_PRODUCTS,
  ADD_TO_CARTS,
  DELETE_ITEM,
  GET_TOTAL,
  GET_PREVIOUS_CARTS,
  FILTER_PRODUCT,
  DECREASE_CART_ITEM,
  GET_CART_LENGTH,
} from "../actions/Types";

export const getItems = (storeId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    // const res = await axios.get("https://fakestoreapi.com/products");
    const id = localStorage.currencyId;
    const shopToView = { shopId: storeId };
    console.log(storeId);
    const res = await axios.post(
      `https://fathomless-harbor-02544.herokuapp.com/product/filter/${id}`,
      shopToView,
      config
    );
    console.log(res.data);
    dispatch({ type: GET_ITEMS, payload: res.data.products });
  } catch (err) {
    console.log(err);
    // dispatch({ type: ITEM_ERROR, payload: err.response.data });
  }
};
export const getProducts = (currencyId) => async (dispatch) => {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  // }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `https://fathomless-harbor-02544.herokuapp.com/product/general-filter/${currencyId}`,

      config
    );
    // console.log(res.data);
    dispatch({ type: GET_All_PRODUCTS, payload: res.data.products });
  } catch (err) {
    console.log(err);
    // dispatch({ type: ITEM_ERROR, payload: err.response.data });
  }
};
export const getUserCartItems = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `https://fathomless-harbor-02544.herokuapp.com/cart`,

      config
    );
    // console.log(res.data);
    dispatch({ type: GET_PREVIOUS_CARTS, payload: res.data });
  } catch (err) {
    console.log(err);
    // dispatch({ type: ITEM_ERROR, payload: err.response.data });
  }
};
export const filterProduct = (text) => async (dispatch) => {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  // }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  const keyword = { name: text };
  const currencyId = localStorage.currencyId;
  try {
    const res = await axios.post(
      `https://fathomless-harbor-02544.herokuapp.com/product/general-filter/${currencyId}`,
      keyword,

      config
    );
    // console.log(res.data);
    dispatch({ type: FILTER_PRODUCT, payload: res.data.products });
  } catch (err) {
    console.log(err);
    // dispatch({ type: ITEM_ERROR, payload: err.response.data });
  }
};

//Add contact
export const addToCart = (item) => async (dispatch) => {
  dispatch({ type: ADD_TO_CARTS, payload: item });

  // contact.id = uuidv4();
};

//Delete contact
export const deleteItem = (item) => async (dispatch) => {
  dispatch({ type: DELETE_ITEM, payload: item });
};

//decrease cart
export const decreaseCart = (item) => async (dispatch) => {
  dispatch({ type: DECREASE_CART_ITEM, payload: item });
};

//Determine Amount to pay

export const amountToPay = (item) => async (dispatch) => {
  dispatch({ type: GET_TOTAL, payload: item });
};

//Items in Cart

export const itemInCart = (item) => async (dispatch) => {
  dispatch({ type: GET_CART_LENGTH, payload: item });
};
