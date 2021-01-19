import axios from "axios";
import API_BASE_URL from "../utils/util";
import setAuthToken from "../utils/SetAuthToken";

export const Subscribe = async (callBackFunction) => {
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
      `${API_BASE_URL}merchant/generate-reference-for-merchant-approval`,
      config
    );

    // console.log(res.data);
    callBackFunction(res.data);
  } catch (error) {
    if (error.response.data.status === 422) {
      callBackFunction(error.response.data);
    }
    console.error(error);
  }
};
