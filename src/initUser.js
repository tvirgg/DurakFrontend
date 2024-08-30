import axios from "axios";
import config from "./config";

async function initUser() {
  const response = await fetch(`${config.url}/users/init`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ initData: window.Telegram.WebApp.initData }),
  });
  const data = await response.json();
  localStorage.setItem("user", JSON.stringify(data));
  // .then(
  //   await axios.get(config.url + "/users").then((res) => {
  //     console.log(res.data);
  //   })
  // );
}

export default initUser;
