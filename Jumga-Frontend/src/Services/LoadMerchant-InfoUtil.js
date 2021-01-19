import axios from "axios";
import util from "../utils/util";
import setAuthToken from "../utils/SetAuthToken";

export const loadMerchantInfo = async (callBackFunction) => {
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
    // console.log(res.data.user.firstName);
    callBackFunction(res.data.user);
  } catch (err) {
    console.log(err);
    // if (error.response.data.status === 422) {
    //     callBackFunction(error.response.data);
    //   }
  }
};
