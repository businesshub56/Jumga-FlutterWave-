import axios from "axios";
import API_BASE_URL from "../utils/util";
import setAuthToken from "../utils/SetAuthToken";

export const getCurrencyType = async (callBackFunction) => {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  // }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(`${API_BASE_URL}currency`, config);

    // console.log(res.data);
    callBackFunction(res.data);
  } catch (error) {
    console.error(error);
  }
};
export const getAvailableDispatchRider = async (callBackFunction, id) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(`${API_BASE_URL}dispatch-rider/${id}`, config);

    // console.log(res.data);
    callBackFunction(res.data);
  } catch (error) {
    console.error(error);
  }
};
export const createShop = async (callBackFunction, data) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    await axios.post(`${API_BASE_URL}merchant/create-shop`, data, config);

    // console.log(res.status);
    callBackFunction({ message: "200" });
  } catch (error) {
    console.error(error);
    if (error.response.data.status === 422) {
      callBackFunction(error.response.data);
    } else {
      callBackFunction({ message: "Error in creating shop" });
    }
  }
};
export const getPaymentRef = async (callBackFunction, id) => {
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
      `${API_BASE_URL}merchant/generate-reference-for-shop-approval/${id}`,

      config
    );

    // console.log(res.data);
    callBackFunction(res.data);
  } catch (error) {
    console.error(error);
    if (error.response.data.status === 422) {
      callBackFunction(error.response.data);
    }
    // else {
    //   callBackFunction({ message: "Error in creating shop" });
    // }
  }
};
