import * as React from "react";
import img from "../../media/img/icons/chat.png";
const IconChat = (props) => (
  <img
    src={img}
    alt="icon"
    width={35}
    height={35}
    className="icon iconChat"
    {...props}
  />
);
export default IconChat;
