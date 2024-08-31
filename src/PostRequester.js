import axios from "axios";
import config from "./config";
import ShowPopup from "./ShowPopup";
const PostRequester = async (url, body) => {
  try {
    await axios.post(config.url + url, body, { withCredentials: true });
  } catch (err) {
    alert(err);
    if (err.response.data) {
      ShowPopup(err.response.data, "Error");
    } else {
      ShowPopup(err, "Error");
    }
  }
};

export default PostRequester;
