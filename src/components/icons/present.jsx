import * as React from "react";
import img from "../../media/img/icons/prize.png";
const IconPresent = (props) => (
  <img
    src={img}
    alt="icon"
    width={35}
    height={35}
    className="icon iconPresent"
    {...props}
  />
);
export default IconPresent;
