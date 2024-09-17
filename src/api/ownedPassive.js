import axios from "axios";
import config from "../config";

async function ownedPassive() {
  try {
    const res = await axios.get(config.url + "/users/storage", {
      headers: {
        "Access-Control-Expose-Headers": "X-Session",
        "X-Session": localStorage.getItem("session_key"),
      },
    });
    localStorage.setItem("session_key", res.headers.get("X-Session"));
    return res.data.coinPassive;
  } catch (error) {
    console.error("Error fetching ownedPassive:", error);
    localStorage.setItem(
      "session_key",
      error.response.headers.get("X-Session")
    );
    return null;
  }
}

export default ownedPassive;
