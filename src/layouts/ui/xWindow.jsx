import React, { useState } from "react";
// css
import "../../media/css/ui.css";
// components
// icons
import { X } from "react-bootstrap-icons";

const UI_WINDOWX = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="ui_xWindow anim_sjump">
      <button className="close_btn" onClick={handleClose}>
        <X />
      </button>
      {children}
    </div>
  );
};

export default UI_WINDOWX;
