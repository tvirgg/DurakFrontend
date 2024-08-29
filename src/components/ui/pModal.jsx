import React from "react";
// css
import "../../media/css/ui/pModal.css";
// Assume pSucces and pFail are imported images
import pSucces from "../../media/img/profile/pSucces.png";
import pFail from "../../media/img/icons/coinGold.png";

const PModal = ({ isActive, type, closeModal, succesText }) => {
  return (
    isActive && (
      <div className="p_verify_modal modal_active">
        {type === "success" ? (
          <div className="modal success active">
            <img src={pSucces} alt="Success" />
            <h1>Congratulations</h1>
            <h2>{succesText}</h2>
            <button className="close_btn" onClick={closeModal}>
              Close
            </button>
          </div>
        ) : (
          <div className="modal fail active">
            <img src={pFail} alt="Fail" />
            <h1>Sorry, you can’t buy this</h1>
            <h2>Insufficient balance</h2>
            <button className="close_btn" onClick={closeModal}>
              Close
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default PModal;
