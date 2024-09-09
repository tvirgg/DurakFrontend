import config from "./config";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const connectToSocket = (gameId, onChangeFunction) => {
  let stompClient = null;
  let socket = new SockJS(
    config.url +
      "/gameplay?X-Session=" +
      JSON.parse(localStorage.getItem("user")).id
  );
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log("connected to the frame: " + frame);
    stompClient.subscribe(
      "/topic/game-progress/" + gameId,

      function (response) {
        let data = JSON.parse(response.body);
        onChangeFunction(data);
      }
    );
  });
};

export default connectToSocket;
