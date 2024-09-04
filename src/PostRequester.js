import axios from "axios";
import config from "./config";
import ShowPopup from "./ShowPopup";
const PostRequester = async (url, body) => {
  try {
    await axios
    .post(config.url + url, body, {
      headers: {
        "Access-Control-Expose-Headers": "X-Session",
        "X-Session": localStorage.getItem("session_key"),
      },
    })
    .then((res) => {
      localStorage.setItem("session_key", res.headers.get("X-Session"));
    });
  } catch (err) {
    if (err.response.data) {
      ShowPopup(err.response.data, "Error");
    }
  }
};

export default PostRequester;
