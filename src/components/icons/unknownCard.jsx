import * as React from "react";
import img from "../../media/img/icons/unknownTable.png";
const IconUnknownCard = (props) => (
  <img
    width={22}
    height={30}
    src={img}
    alt="icon"
    className="icon iconUnknownFrame"
    {...props}
  />
);
export default IconUnknownCard;
