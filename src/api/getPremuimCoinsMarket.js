import axios from "axios";
import config from "../config";

async function getPremuimCoinsMarket() {
  try {
    const res = await axios.get(config.url + "/users/premium-pricing", {
      headers: {
        "Access-Control-Expose-Headers": "X-Session",
        "X-Session": localStorage.getItem("session_key"),
      },
    });
    localStorage.setItem("session_key", res.headers.get("X-Session"));
    return res.data;
  } catch (error) {
    console.error("Error fetching friends:", error);
    return null;
  }
}

export default getPremuimCoinsMarket;
