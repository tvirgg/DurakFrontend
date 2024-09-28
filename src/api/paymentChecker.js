import axios from "axios";
import config from "../config";

async function paymentChecker(amount) {
  try {
    const res = await axios.post(
      config.url + "/users/pay",
      {
        amount: amount,
      },
      {
        headers: {
          "Access-Control-Expose-Headers": "X-Session",
          "X-Session": localStorage.getItem("session_key"),
        },
      }
    );
    localStorage.setItem("session_key", res.headers.get("X-Session"));
    return res;
  } catch (error) {
    console.error("Error connect:", error);
    return error.response;
  }
}

export default paymentChecker;
