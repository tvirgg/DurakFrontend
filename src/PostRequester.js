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
        console.log(res.data);
        return res.data;
      });
  } catch (err) {
    if (err.response.data) {
      ShowPopup(err.response.data, "Error");
    }
    localStorage.setItem("session_key", err.response.headers.get("X-Session"));
    return null;
  }
};

export default PostRequester;
