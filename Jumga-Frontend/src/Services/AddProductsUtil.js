import axios from "axios";
import API_BASE_URL from "../utils/util";
import setAuthToken from "../utils/SetAuthToken";

export const addProductUtil = async (callBackFunction, item) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    await axios.post(`${API_BASE_URL}product/add`, item, config);

    // console.log(res.data);
    callBackFunction({ message: 200 });
  } catch (error) {
    console.error(error);
    if (error.response.data.status === 422) {
      callBackFunction(error.response.data);
    } else {
      callBackFunction({ message: "Error adding Item to store" });
    }
  }
};

export const fetchProductCategory = async (callBackFunction) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(`${API_BASE_URL}product/category`, config);
    callBackFunction(res.data);
    // console.log(res.data);
  } catch (error) {
    console.log(error);
    // if (error.response.data.status === 422) {
    //   callBackFunction(error.response.data);
    // }
  }
};
