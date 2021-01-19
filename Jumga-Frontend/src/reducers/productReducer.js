import {
  GET_ITEMS,
  GET_All_PRODUCTS,
  GET_PREVIOUS_CARTS,
  ADD_TO_CARTS,
  FILTER_PRODUCT,
  DELETE_ITEM,
  DECREASE_CART_ITEM,
  GET_TOTAL,
  GET_CART_LENGTH,
} from "../actions/Types";
import {
  addItemToCart,
  decreaseItem,
  getAmountToPay,
  getCartLength,
} from "../utils/cart.utils";
// import { getCurrencyType } from "../Services/CreateShoputil";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
// const inCart = [];
const initialState = {
  // inCart: JSON.parse(window.localStorage.getItem(inCart)),
  cart: [],
  filtered: null,
  loading: true,
  items: [],
  products: [],
  error: null,
  TotalAmountToPay: 0,
  inCartLength: 0,
  currencyId: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case GET_All_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        items: action.payload,
        loading: false,
      };
    case FILTER_PRODUCT:
      return {
        ...state,
        products: action.payload,
        items: action.payload,
        loading: false,
      };
    case GET_PREVIOUS_CARTS:
      return {
        ...state,
        // cart: addItemToCart(state.cart, action.payload),
        cart: action.payload,
        // TotalAmountToPay: getAmountToPay(state.cart),
      };
    case ADD_TO_CARTS:
      return {
        ...state,
        cart: addItemToCart(state.cart, action.payload),
        TotalAmountToPay: getAmountToPay(state.cart),
      };
    case DELETE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case DECREASE_CART_ITEM:
      return {
        ...state,
        cart: decreaseItem(state.cart, action.payload),
        loading: false,
      };
    // case GET_CURRENCY_ID:
    //   return {
    //     ...state,
    //     currencyId: getCurrencyType(state.cart),
    //   };
    case GET_TOTAL:
      return {
        ...state,
        TotalAmmountToPay: getAmountToPay(state.cart),
      };
    case GET_CART_LENGTH:
      return {
        ...state,
        inCartLength: getCartLength(state.cart),
      };

    // case FILTER_CONTACT:
    //   return {
    //     ...state,
    //     filtered: state.contacts.filter((contact) => {
    //       const regex = new RegExp(`${action.payload}`, "gi");
    //       return contact.name.match(regex) || contact.email.match(regex);
    //     }),
    //   };
    // case CLEAR_FILTER:
    //   return {
    //     ...state,
    //     filtered: null,
    //   };
    // case CONTACT_ERROR:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };

    default:
      return state;
  }
};
