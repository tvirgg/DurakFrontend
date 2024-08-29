import React from "react";
// import { Plus, ArrowUpRight } from "react-bootstrap-icons";
// css

// icons
import IconPlusB from "./icons/plusB";
import IconArrowFb from "./icons/arrowFb";
import IconTraficB from "./icons/traficB";
// Array of user data

const TransactionHistory = () => {
  return (
    <div className="transaction_history">
      <h2>Transaction history:</h2>
      <div className="row">
        <span className="date">13.08.24 - 14:31</span>
        <div className="vall">
          <IconPlusB />
          100 DUR (6-TON)
        </div>
      </div>
      <div className="row">
        <span className="date">13.08.24 - 14:31</span>
        <div className="vall">
          <IconArrowFb />
          100DUR (5.7 TON)
        </div>
      </div>
      <div className="row">
        <span className="date">13.08.24 - 14:31</span>
        <div className="vall">
          100DUR
          <IconTraficB />
          6000 gold
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
