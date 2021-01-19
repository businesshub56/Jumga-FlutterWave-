import axios from "axios";
import API_BASE_URL from "../utils/util";
import setAuthToken from "../utils/SetAuthToken";

export const cartItemsServices = async (carts) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  let cartItems = [];
  if (carts) {
    carts.map((item) => {
      cartItems.push({
        productId: item.id,
        quantity: item.quantity,
      });
      return cartItems;
    });
  }
  const Id = localStorage.currencyId;
  try {
    await axios.post(`${API_BASE_URL}cart/${Id}`, cartItems, config);

    // callBackFunction(res.data.status);
  } catch (error) {
    console.error(error);
  }
};
export const deleteCartItem = async (cart, id) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  const cartItems = [
    {
      productId: cart.id,
      quantity: cart.quantity,
    },
  ];

  // callBackFunction(res.data);
  try {
    await axios.delete(`${API_BASE_URL}cart/${id}`, cartItems, config);
  } catch (error) {
    console.error(error);
  }
};
