import axios from "axios";
import API_BASE_URL from "../utils/util";
import setAuthToken from "../utils/SetAuthToken";

export const orderListUtils = async (callBackFunction, item) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  const filterParams = item ? item : {};

  try {
    const res = await axios.post(
      `${API_BASE_URL}merchant/fetch-orders`,
      filterParams,
      config
    );

    // console.log(res.data);
    callBackFunction(res.data.salesOrders);
  } catch (error) {
    console.error(error);
    if (error.response.data.status === 422) {
      callBackFunction(error.response.data);
    }
  }
};
export const downloaOrderFile = async (callBackFunction, item) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  const filterParams = item ? item : {};

  try {
    const res = await axios.post(
      `${API_BASE_URL}merchant/download-orders`,
      filterParams,
      config
    );

    console.log(res.data);
    callBackFunction(res.data);
  } catch (error) {
    console.error(error);
    // if (error.response.data.status === 422) {
    //   callBackFunction(error.response.data.message);
    // }
  }
};
