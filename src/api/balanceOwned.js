import axios from "axios";
import config from "../config";

async function balanceOwned() {
  try {
    const res = await axios.get(config.url + "/users/balance", {
      headers: {
        "Access-Control-Expose-Headers": "X-Session",
        "X-Session": localStorage.getItem("session_key"),
      },
    });
    localStorage.setItem("session_key", res.headers.get("X-Session"));
    return res.data;
  } catch (error) {
    console.error("Error fetching ownedPassive:", error);
    localStorage.setItem(
      "session_key",
      error.response.headers.get("X-Session")
    );
    return null;
  }
}

export default balanceOwned;
