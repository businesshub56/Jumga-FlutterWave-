import axios from "axios";
import API_BASE_URL from "../utils/util";
import setAuthToken from "../utils/SetAuthToken";

export const getCartItemsOnCheckout = async (callBackFunction) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  const id = localStorage.currencyId;
  try {
    const res = await axios.get(`${API_BASE_URL}cart/${id}`, config);

    // console.log(res.data);
    callBackFunction(res.data);
  } catch (error) {
    console.error(error);
  }
};
export const getPaymentRefOnCheckout = async (callBackFunction, info) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  const address = { deliveryAddress: info };
  const id = localStorage.currencyId;
  try {
    const res = await axios.post(
      `${API_BASE_URL}cart/checkout/${id}`,
      address,
      config
    );

    // console.log(res.data);
    callBackFunction(res.data);
  } catch (error) {
    console.error(error);
  }
};
export const checkoutPaymentUpdate = async (info) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  // const checkoutId = info;
  try {
    await axios.get(
      `${API_BASE_URL}cart/update-checkout-status/${info}`,

      config
    );

    // console.log(res.data);
    // await callBackFunction("200");
  } catch (error) {
    console.error(error);
  }
};
