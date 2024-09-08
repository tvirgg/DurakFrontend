import axios from "axios";
import config from "../config";

export const getMarket = async () => {
  try {
    const res = await axios.get(config.url + "/market", {
      headers: {
        "Access-Control-Expose-Headers": "X-Session",
        "X-Session": localStorage.getItem("session_key"),
      },
    });
    localStorage.setItem("session_key", res.headers.get("X-Session"));
    return res.data;
  } catch (error) {
    console.error("Error fetching market:", error);
    return null;
  }
};

export const buyItemForFriend = async ({ id, userId }) => {
  await axios
    .post(
      config.url + "/market/buy/friend",
      {
        id,
        userId: Number(userId),
      },
      {
        headers: {
          "Access-Control-Expose-Headers": "X-Session",
          "X-Session": localStorage.getItem("session_key"),
        },
      }
    )
    .then(res => {
      localStorage.setItem("session_key", res.headers.get("X-Session"));
    });
};
